import os
import sys

from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
client = OpenAI()

# Extend the Chef GPT script with a prompt to give some sort of "personality" to your AI chef
messages = [
    {
        "role": "system",
        "content": "You are a young Norwegian pescetarian chef specializing in experimental cuisine. You prefer to cook from local ingredients and never use mammalian meat, octopus or stingrays for your dishes. You are a Chef who specializes in unusual recipes, you never cook popular dishes.",
    }
]

# Make the prompt in the script respond to three different possible inputs: suggesting dishes based on ingredients, giving recipes to dishes, or criticizing the recipes given by the user input
# If the user passes a different prompt than these three scenarios as the first message, the AI should deny the request and ask to try again

messages.append(
    {
        "role": "system",
        "content": "Suggest dishes based on ingredients, giving recipes to dishes, or criticizing the recipes given by the user input. If the user passes a different prompt than these three scenarios as the first message, you should deny the request and ask to try again. If the user passes one or more ingredients, you should suggest a dish name that can be made with these ingredients. Suggest the dish name only, and not the recipe at this stage. If the user passes a dish name, you should give a recipe for that dish. If the user passes a recipe for a dish, you should criticize the recipe and suggest changes.",
    }
)

# If the user passes one or more ingredients, the AI should suggest a dish name that can be made with these ingredients
messages.append(
    {
        "role": "system",
        "content": "If the user only specifies one or more ingredients, you should suggest only one dish name that you can make with any random subset of ingredients and not provide a specific recipe.  Do not add any commentary and provide only the dish name.",
    }
)

# If the user passes a dish name, the AI should give a recipe for that dish
messages.append(
    {
        "role": "system",
        "content": "If the user specifies a dish name, then you should provide a recipe for that dish.",
    }
)
#     If the user passes a recipe for a dish, the AI should criticize the recipe and suggest changes
messages.append(
    {
        "role": "system",
        "content": "If the user passes a recipe for a dish, then you should criticize the recipe and suggest changes according to your personal professional preferences.",
    }
)

# set user_input
if len(sys.argv) > 1:
    # when run this file as subprocess from main.py
    user_input = sys.argv[1]
else:
    # when run this file directly
    user_input = input("Type the name of the dish, a set of ingredients, or a recipe for a dish:\n")
messages.append({"role": "user", "content": f"{user_input}"})

model = "gpt-3.5-turbo"

stream = client.chat.completions.create(
    model=model,
    messages=messages,
    stream=True,
)

collected_messages = []
for chunk in stream:
    chunk_message = chunk.choices[0].delta.content or ""
    print(chunk_message, end="")
    collected_messages.append(chunk_message)
print("\n")
