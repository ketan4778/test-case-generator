const buildPrompt = (userInput) => {
    return `You are an expert QA Lead.
Your task is to write detailed **Functional Test Cases** for the following requirements or story.

Rules:
1. Do NOT generate code. Generate manual test scenarios.
2. Cover Positive, Negative, Edge Case, and UI/UX scenarios.
3. Use the following Markdown format for each test case:

### Test Case [ID]
- **Scenario**: [Short description]
- **Type**: [Positive/Negative/Edge]
- **Pre-conditions**: [Requirements]
- **Steps**:
  1. [Step 1]
  2. [Step 2]
- **Expected Result**: [What should happen]

4. Ensure particular attention to business logic and user experience.

Input:
${userInput}`;
};

module.exports = { buildPrompt };
