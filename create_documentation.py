from fpdf import FPDF
from datetime import date

# Create PDF class for documentation
class PDF(FPDF):
    def header(self):
        # Set font to Helvetica, bold, 14pt
        self.set_font("helvetica", "B", 14)
        # Title
        self.cell(0, 10, "EduBot - AI Fundamentals Assistant", new_x="LMARGIN", new_y="NEXT", align="C")
        # Line break
        self.ln(5)

    def footer(self):
        # Position at 1.5 cm from bottom
        self.set_y(-15)
        # Set font to Helvetica, italic, 8pt
        self.set_font("helvetica", "I", 8)
        # Page number
        self.cell(0, 10, f"Page {self.page_no()}", align="C")

# Create and set up the PDF for documentation
pdf = PDF()
pdf.set_auto_page_break(auto=True, margin=15)
pdf.add_page()
pdf.set_font("helvetica", "", 11)

# Content: Documentation
documentation_content = f"""
Developer: Keawin Koesnel
Deployment Link: https://mooncakesg.github.io
Date: 19 May 2025

1. Platform Selection & Justification:
IBM watsonx Assistant was chosen for its:
- No-code chatbot building features
- Natural Language Processing capabilities
- Rich integration options and support for multimedia
- Context-aware conversation handling
- Embed capabilities for easy website integration

2. Implemented Q&A Pairs (Sample of 15)
#	User Question	Bot Answer
1	What is artificial intelligence?	AI is the simulation of human intelligence processes by machines.
2	What is machine learning?	ML is a subset of AI where systems learn from data and improve over time.
3	What is deep learning?	Deep learning is a type of ML using neural networks with many layers.
4	How is AI different from ML?	AI is the broad field; ML is a method within AI focused on learning from data.
5	What is NLP?	NLP stands for Natural Language Processing, enabling machines to understand human language.
6	What are real-world AI applications?	AI is used in healthcare, finance, self-driving cars, voice assistants, and more.
7	What are neural networks?	They are models inspired by the human brain, used in deep learning.
8	What is computer vision?	CV is a field of AI focused on interpreting visual information from the world.
9	What is a large language model (LLM)?	LLMs are AI models trained on massive text datasets to generate human-like language.
10	What are AI ethics?	AI ethics deal with responsible design and deployment, including fairness and accountability.
11	What is algorithmic bias?	It's when AI models produce unfair outcomes due to biased training data.
12	What are the privacy concerns in AI?	AI systems can misuse or over-collect personal data without consent.
13	Can AI be creative?	Yes, generative models like GPT can write, compose music, and more.
14	What is supervised learning?	A type of ML where models are trained on labeled data.
15	How does AI affect jobs?	AI automates tasks, changing job roles but also creating new opportunities.

3. Conversation Flows

Flow 1: Learn about NLP
-> Definition -> Applications -> Challenges

Flow 2: Explore AI Ethics
-> Ethics Overview -> Bias in AI -> Privacy Risks

4. Multimedia Elements
- Diagram: AI vs ML vs DL
- Architecture: Neural Networks
- Decision Trees: Ethical AI

Interactive: Quiz questions to reinforce learning

5. Further Learning Feature
EduBot recommends curriculum modules from Bootcamp Modules 1-4.

6. Error Handling
EduBot responds with fallback messages like:
"I'm not sure yet, but I'm still learning! Try asking about AI fundamentals."
"""

# Add documentation content
pdf.multi_cell(0, 10, documentation_content)

# Save documentation PDF
pdf_output_path = "EduBot_Project_Documentation.pdf"
pdf.output(pdf_output_path)

# Create new PDF for user guide
user_guide = PDF()
user_guide.set_auto_page_break(auto=True, margin=15)
user_guide.add_page()
user_guide.set_font("helvetica", "", 11)

# Content: User Guide
user_guide_content = f"""
2. User Guide (1 page)
EduBot User Guide

Welcome to EduBot!
Your friendly assistant to learn about AI fundamentals.

[CHAT] How to Interact:

Ask a Question
Example: "What is AI?" or "Explain neural networks."

Explore a Topic
Say: "Learn about NLP" or "Explore AI ethics"

Take the Quiz
Try: "Test my knowledge" or "Give me a quiz"

Ask Follow-Up Questions
EduBot can handle follow-ups like:
"What are some applications?"
"What challenges are there?"

Get Learning Resources
Say: "Where can I learn more?"
EduBot will suggest bootcamp modules

[SYNC] Tips
- Keep your questions short and clear.
- If the bot doesn't understand, try rephrasing.
- Click the embedded visuals for diagrams.
- Ask EduBot to quiz you for a fun challenge!
"""

# Add user guide content
user_guide.multi_cell(0, 10, user_guide_content)

# Save user guide PDF
user_guide_output_path = "EduBot_User_Guide.pdf"
user_guide.output(user_guide_output_path)

print(f"PDF documentation has been created: {pdf_output_path}")
print(f"User guide PDF has been created: {user_guide_output_path}") 