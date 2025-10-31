#main.py
import traceback

if __name__ == "__main__":
    try:
        from ui.menu_interface import show_main_menu
        show_main_menu()
    except Exception as e:
        print(e)
        traceback.print_exc()  # Mostra arquivo, linha, função
