import cv2
import numpy as np


def refine_point_with_corners(imgA, imgB, left_point, right_click, search_radius=30, method='shi-tomasi'):
    """
    Refina a posição usando Harris Corner Detection ou Shi-Tomasi.

    Args:
        imgA: Imagem da esquerda (grayscale)
        imgB: Imagem da direita (grayscale)
        left_point: Ponto na imagem esquerda (x, y)
        right_click: Clique inicial na imagem direita (x, y)
        search_radius: Raio de busca ao redor do clique
        method: 'harris' ou 'shi-tomasi'

    Returns:
        tuple: (left_point_refined, right_point_refined)
    """
    xL, yL = map(int, left_point)
    xR, yR = map(int, right_click)
    h, w = imgA.shape

    print(f"🎯 Refinando pontos: L({xL},{yL}) -> R({xR},{yR}) com {method}")

    # === PASSO 1: Refinar ponto esquerdo ===
    left_refined = refine_single_point_corners(imgA, (xL, yL), search_radius // 2, method)
    print(f"   📍 Esquerda: ({xL},{yL}) -> ({left_refined[0]:.1f},{left_refined[1]:.1f})")

    # === PASSO 2: Refinar ponto direito ===
    right_refined = refine_single_point_corners(imgB, (xR, yR), search_radius, method)
    print(f"   📍 Direita: ({xR},{yR}) -> ({right_refined[0]:.1f},{right_refined[1]:.1f})")

    # === PASSO 3: Validação final com tracking ===
    if method == 'shi-tomasi':
        # Usa Shi-Tomasi + Lucas-Kanade para tracking mais preciso
        final_right = track_with_optical_flow(imgA, imgB, left_refined, right_refined)
        if final_right is not None:
            print(f"   🎯 Tracking refinado: ({final_right[0]:.1f},{final_right[1]:.1f})")
            right_refined = final_right

    return left_refined, right_refined


def refine_single_point_corners(image, point, search_radius, method='shi-tomasi'):
    """
    Refina um único ponto usando detecção de cantos.

    Args:
        image: Imagem em grayscale
        point: Ponto inicial (x, y)
        search_radius: Raio de busca
        method: 'harris' ou 'shi-tomasi'

    Returns:
        tuple: Ponto refinado (x, y)
    """
    x, y = map(int, point)
    h, w = image.shape

    # Define região de busca
    x1 = max(0, x - search_radius)
    x2 = min(w, x + search_radius)
    y1 = max(0, y - search_radius)
    y2 = min(h, y + search_radius)

    # Extrai região de interesse
    roi = image[y1:y2, x1:x2]

    if roi.size == 0:
        return point

    if method == 'harris':
        return refine_with_harris(roi, point, (x1, y1))
    else:
        return refine_with_shi_tomasi(roi, point, (x1, y1))


def refine_with_harris(roi, original_point, roi_offset):
    """
    Refina ponto usando Harris Corner Detection.
    """
    # Parâmetros do Harris
    block_size = 3  # Tamanho da janela para derivadas
    k_size = 3  # Tamanho do kernel Sobel
    k_param = 0.04  # Parâmetro Harris (0.04-0.06)

    # Aplica Harris Corner Detection
    harris_response = cv2.cornerHarris(roi, block_size, k_size, k_param)

    # Normaliza a resposta
    harris_response = cv2.normalize(harris_response, None, 0, 255, cv2.NORM_MINMAX, dtype=cv2.CV_8U)

    # Encontra máximos locais
    # Aplica dilatação para encontrar máximos locais
    kernel = np.ones((5, 5), np.uint8)
    dilated = cv2.dilate(harris_response, kernel, iterations=1)

    # Pontos onde resposta = dilatação são máximos locais
    local_maxima = (harris_response == dilated) & (harris_response > 30)  # threshold

    # Encontra coordenadas dos máximos
    corners = np.where(local_maxima)

    if len(corners[0]) == 0:
        print("   ⚠️  Nenhum canto Harris encontrado, usando gradiente")
        return refine_with_gradient(roi, original_point, roi_offset)

    # Calcula distâncias ao ponto original
    ox, oy = original_point
    roi_ox, roi_oy = ox - roi_offset[0], oy - roi_offset[1]

    distances = []
    for i in range(len(corners[0])):
        cy, cx = corners[0][i], corners[1][i]
        dist = np.sqrt((cx - roi_ox) ** 2 + (cy - roi_oy) ** 2)
        distances.append((dist, cx, cy, harris_response[cy, cx]))

    # Ordena por distância e pega o mais próximo com boa resposta
    distances.sort(key=lambda x: x[0])

    # Filtra por qualidade mínima
    good_corners = [d for d in distances if d[3] > 50]

    if good_corners:
        best_corner = good_corners[0]
        refined_x = roi_offset[0] + best_corner[1]
        refined_y = roi_offset[1] + best_corner[2]
        print(f"   ✅ Harris: qualidade={best_corner[3]:.1f}, dist={best_corner[0]:.1f}")
        return (refined_x, refined_y)
    else:
        print("   ⚠️  Cantos Harris com baixa qualidade, usando gradiente")
        return refine_with_gradient(roi, original_point, roi_offset)


def refine_with_shi_tomasi(roi, original_point, roi_offset):
    """
    Refina ponto usando Shi-Tomasi Good Features to Track.
    """
    # Parâmetros do Shi-Tomasi
    max_corners = 5  # Máximo de cantos a detectar
    quality_level = 0.01  # Qualidade mínima (0.01-0.1)
    min_distance = 5  # Distância mínima entre cantos
    block_size = 3  # Tamanho da janela
    use_harris = False  # False = Shi-Tomasi, True = Harris

    # Aplica Shi-Tomasi
    corners = cv2.goodFeaturesToTrack(
        roi,
        maxCorners=max_corners,
        qualityLevel=quality_level,
        minDistance=min_distance,
        blockSize=block_size,
        useHarrisDetector=use_harris
    )

    if corners is None or len(corners) == 0:
        print("   ⚠️  Nenhum canto Shi-Tomasi encontrado, usando gradiente")
        return refine_with_gradient(roi, original_point, roi_offset)

    # Calcula distâncias ao ponto original
    ox, oy = original_point
    roi_ox, roi_oy = ox - roi_offset[0], oy - roi_offset[1]

    distances = []
    for corner in corners:
        cx, cy = corner.ravel()
        dist = np.sqrt((cx - roi_ox) ** 2 + (cy - roi_oy) ** 2)
        distances.append((dist, cx, cy))

    # Pega o canto mais próximo
    distances.sort(key=lambda x: x[0])
    best_corner = distances[0]

    refined_x = roi_offset[0] + best_corner[1]
    refined_y = roi_offset[1] + best_corner[2]

    print(f"   ✅ Shi-Tomasi: {len(corners)} cantos, melhor dist={best_corner[0]:.1f}")
    return (refined_x, refined_y)


def refine_with_gradient(roi, original_point, roi_offset):
    """
    Fallback: refina usando gradiente máximo.
    """
    # Calcula gradientes
    grad_x = cv2.Sobel(roi, cv2.CV_32F, 1, 0, ksize=3)
    grad_y = cv2.Sobel(roi, cv2.CV_32F, 0, 1, ksize=3)

    # Magnitude do gradiente
    gradient_magnitude = np.sqrt(grad_x ** 2 + grad_y ** 2)

    # Encontra ponto com maior gradiente
    max_idx = np.unravel_index(np.argmax(gradient_magnitude), gradient_magnitude.shape)
    max_y, max_x = max_idx

    refined_x = roi_offset[0] + max_x
    refined_y = roi_offset[1] + max_y

    max_grad = gradient_magnitude[max_y, max_x]
    print(f"   📊 Gradiente: max={max_grad:.1f} em ({max_x},{max_y})")

    return (refined_x, refined_y)


def track_with_optical_flow(imgA, imgB, left_point, right_estimate):
    """
    Usa Lucas-Kanade Optical Flow para tracking mais preciso.
    """
    try:
        # Parâmetros do Lucas-Kanade
        lk_params = dict(
            winSize=(21, 21),  # Janela de busca
            maxLevel=3,  # Níveis de pirâmide
            criteria=(cv2.TERM_CRITERIA_EPS | cv2.TERM_CRITERIA_COUNT, 30, 0.01)
        )

        # Converte pontos para formato do OpenCV
        p0 = np.array([[left_point]], dtype=np.float32)

        # Aplica optical flow
        p1, status, error = cv2.calcOpticalFlowPyrLK(imgA, imgB, p0, None, **lk_params)

        if status[0][0] == 1:  # Se tracking foi bem-sucedido
            tracked_point = p1[0][0]
            tracking_error = error[0][0]

            # Valida se o resultado é razoável (não muito longe da estimativa)
            dx = tracked_point[0] - right_estimate[0]
            dy = tracked_point[1] - right_estimate[1]
            distance = np.sqrt(dx ** 2 + dy ** 2)

            if distance < 50 and tracking_error < 10:  # Thresholds conservativos
                return tuple(tracked_point)
            else:
                print(f"   ⚠️  Optical flow muito distante: dist={distance:.1f}, erro={tracking_error:.1f}")

    except Exception as e:
        print(f"   ⚠️  Erro no optical flow: {e}")

    return None


# === FUNÇÃO DE TESTE E VISUALIZAÇÃO ===
def test_corner_refinement(img1_path, img2_path, test_points):
    """
    Função para testar o refinamento em pontos específicos.

    Args:
        img1_path: Caminho da primeira imagem
        img2_path: Caminho da segunda imagem
        test_points: Lista de tuplas [(x1, y1, x2, y2), ...]
    """
    img1 = cv2.imread(img1_path, cv2.IMREAD_GRAYSCALE)
    img2 = cv2.imread(img2_path, cv2.IMREAD_GRAYSCALE)

    if img1 is None or img2 is None:
        print("❌ Erro ao carregar imagens")
        return

    print(f"📷 Testando refinamento em {len(test_points)} pontos")
    print(f"📐 Tamanho das imagens: {img1.shape}")

    for i, (x1, y1, x2, y2) in enumerate(test_points):
        print(f"\n🔍 Teste {i + 1}: P1({x1},{y1}) -> P2({x2},{y2})")

        # Testa Harris
        left_h, right_h = refine_point_with_corners(img1, img2, (x1, y1), (x2, y2), method='harris')
        dx_h, dy_h = right_h[0] - left_h[0], right_h[1] - left_h[1]

        # Testa Shi-Tomasi
        left_s, right_s = refine_point_with_corners(img1, img2, (x1, y1), (x2, y2), method='shi-tomasi')
        dx_s, dy_s = right_s[0] - left_s[0], right_s[1] - left_s[1]

        print(f"   📊 Harris:     deslocamento = ({dx_h:+.1f}, {dy_h:+.1f})")
        print(f"   📊 Shi-Tomasi: deslocamento = ({dx_s:+.1f}, {dy_s:+.1f})")
        print(f"   📊 Diferença:   Δx={abs(dx_h - dx_s):.1f}, Δy={abs(dy_h - dy_s):.1f}")

def refine_with_template(imgA, imgB, left_point, right_click, search_radius=30, window=15):
    xL, yL = map(int, left_point)
    xR, yR = map(int, right_click)

    # Template da esquerda
    template = imgA[yL-window:yL+window, xL-window:xL+window]
    if template.size == 0:
        return left_point, right_click

    # Região de busca na direita
    x1, x2 = xR-search_radius, xR+search_radius
    y1, y2 = yR-search_radius, yR+search_radius
    search = imgB[max(0,y1):y2, max(0,x1):x2]

    if search.size == 0:
        return left_point, right_click

    # Correlaciona
    res = cv2.matchTemplate(search, template, cv2.TM_CCOEFF_NORMED)
    _, _, _, max_loc = cv2.minMaxLoc(res)

    # Ajusta para coordenadas globais
    refined_x = max(0, x1) + max_loc[0] + window
    refined_y = max(0, y1) + max_loc[1] + window

    return (xL, yL), (refined_x, refined_y)



if __name__ == "__main__":
    # Exemplo de uso
    print("🧪 Exemplo de teste do refinamento de cantos")
    print("\nPara usar:")
    print("1. test_corner_refinement('img1.jpg', 'img2.jpg', [(x1,y1,x2,y2), ...])")
    print("2. Ou integrar a função refine_point_with_corners() no seu código principal")