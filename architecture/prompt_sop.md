# Prompt Template SOP

## Goal
Define the exact prompt structure to ensure consistent, high-quality test case generation.

## Logic
The prompt shall consist of:
1. **Role**: "You are an expert QA Lead..."
2. **Instruction**: "Write detailed functional test cases..."
3. **Format Constraint**: "Output in a structured Markdown format (Table or List)..."
4. **Context**: The user provided inputs or requirements.

## Template
```text
You are an expert QA Lead.
Your task is to write detailed **Functional Test Cases** for the following requirements or story.

Rules:
1. Do NOT generate code. Generate manual test scenarios.
2. Cover Positive, Negative, Edge Case, and UI/UX scenarios.
3. Use the following Markdown format for each test case:
   - **TC-ID**: Summary of the test.
   - **Pre-conditions**: What must be true before starting.
   - **Steps**: Numbered list of actions.
   - **Expected Result**: What should happen.
4. Ensure the output is easy to read.

Input:
{{USER_INPUT}}
```
