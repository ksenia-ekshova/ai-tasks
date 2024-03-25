import os
import subprocess
import sys
from pathlib import Path

from dotenv import load_dotenv

load_dotenv()


OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")


# Function to call to ChefGPT Script and return output
def callChefGPT(name, user_input):
    # Get the directory of the current script
    script_dir = os.path.dirname(os.path.abspath(__file__)) + os.sep
    call_file_dir = f"{script_dir}ChefGPT-{name}.py"

    print(f"** Calling ChefGPT-{name}.py:\n")
    command = [sys.executable, call_file_dir, user_input]
    process = subprocess.run(command, capture_output=True, text=True)
    output = process.stdout
    return output


# `main.py` script calls the different scripts with different chiefs based on the user input
chief_names = [
    "Kseniia",  # chief Kseniia Ekshova
]
print("Available chiefs:")
for num, name in enumerate(chief_names):
    print(f"{num + 1}. {name}")

chief_name = input("Enter chief name:\n")
script_dir = os.path.dirname(os.path.abspath(__file__)) + os.sep

while not Path(f"{script_dir}ChefGPT-{chief_name}.py").is_file():
    chief_name = input("Wrong chief name! Please, try again\n")

user_input = input("Type the name of the dish, a set of ingredients, or a recipe for a dish:\n")

response = callChefGPT(chief_name, user_input)
print(response)

report_output = (
    f"Conversation report\nSelected chef name:\n{chief_name}\nUser input:\n{user_input}\nAI-chef output:\n{response}"
)

with open("report.txt", "w+") as file:
    file.write(report_output)
