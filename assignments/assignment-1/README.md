

# Weekend Project - ChefGPT

Encode ID TK25ZS (Kseniia Ekshova)

## How to run locally

1. Open ./assignment-1 folder as root via terminal
2. Run via terminal

python -m venv ./venv
./venv/Scripts/activate
pip install -r requirements.txt

3. Run code

python main.py

4. Choose preferred chief name and ingredients/dish/recipe for inputs

- dev.note: use freeze to save dependancies
pip freeze > requiremens.txt


## Task

For consolidating the knowledge acquired in this week, the students should complete the following project:

1. Create a github repository for your project
2. Add all members of your group
3. Create a README.md file that describes your project
4. Extend the `Chef GPT script` with a prompt to give some sort of "personality" to your AI chef

   * For example, you could make your chef a "young and spirited Indian cook that loves to make Biryani" or a "wise and experienced Italian chef that loves to make pasta"

5. Create one script for each member of your group with a different prompt setting

   * To make things interesting, you could make each member of your group a different "personality" for the AI chef

     * For example, define a "focused and detailist vegan French chef" for one script and a "fun and energetic Mexican chef that loves spicy food" for another

6. Make the prompt in the script respond to three different possible inputs: suggesting dishes based on ingredients, giving recipes to dishes, or criticizing the recipes given by the user input

   * If the user passes a different prompt than these three scenarios as the first message, the AI should deny the request and ask to try again

   * If the user passes one or more ingredients, the AI should suggest a dish name that can be made with these ingredients

     * Try to make the AI suggest the dish name only, and not the recipe at this stage

   * If the user passes a dish name, the AI should give a recipe for that dish

   * If the user passes a recipe for a dish, the AI should criticize the recipe and suggest changes

7. Create a `main.py` script that will call the different scripts based on the user input

8. Experiment passing a list of ingredients for one script, then ask another script for a recipe for that dish, and then criticize the recipe given by the last script with a third script

9. Create a report with the results of the experiment and the different outputs of the AI chefs

10. Submit your project in the submission form