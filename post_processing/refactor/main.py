from npz_tools import processFolder
from plot_2d import plot2DFromData
from plot_3d import plot3DFromData

loaded_data = processFolder()
plot2DFromData(loaded_data["displacements"])
plot3DFromData(loaded_data["displacements"],loaded_data["quaternions"])