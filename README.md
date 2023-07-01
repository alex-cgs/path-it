# Welcome to Path-IT

Path-IT is the second Bachelor Semester Project initiated by Tinouert Alexandre under the guidance of Pr. Dr. Luis Leiva, at the University of Luxembourg.

# 
## Links:
[Path-IT](https://alex-cgs.github.io/path-it/) <br>
[GitHub Repo](https://github.com/CookNChips/path-it) 
#

# Commands
### 1) Run a simulation

To run a simulation, please load a standard map from the "Choose Map" dropdown menu, or enter your map. Press the UP key to begin the run.

### 2) Load personalized maps 

To load personalized maps in the "Enter your map" input field, follow those mandatory rules (you can use the template below):
- Your map should be a 10x10 JavaScript input array.
- This array should abide to those rulse:
- - 0: Empty cell 
- - 1: Starting Cell (exactly one)
- - 2: Obstacles
- - 3: Ending Cell (exactly one)

Here is an example template for debug_1 that you can copy, modify and paste into the field before pressing "Send Map" button:

[[1, 0, 0, 0, 0, 0, 0, 0, 0, 0],<br>
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], <br>
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], <br>
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], <br>
[0, 0, 0, 0, 2, 2, 0, 0, 0, 0], <br>
[0, 0, 0, 0, 2, 2, 0, 0, 0, 0], <br>
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], <br>
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], <br>
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], <br>
[0, 0, 0, 0, 0, 0, 0, 0, 0, 3]]

(If you're reading this markdown file as a text file, remove the linebreaks: "<br\>").
