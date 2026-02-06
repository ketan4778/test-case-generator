const buildPrompt = (userInput, format) => {
  console.log(`Building prompt with format: ${format}`); // DEBUG LOG
  const isGherkin = format === 'gherkin';

  const standardInstructions = `
3. Use the following Markdown format for each test case:

### Test Case [ID]
- **Scenario**: [Short description]
- **Type**: [Positive/Negative/Edge]
- **Pre-conditions**: [Requirements]
- **Steps**:
  1. [Step 1]
  2. [Step 2]
- **Expected Result**: [What should happen]`;

  const gherkinInstructions = `
3. Use the following Markdown format with Gherkin syntax for each test case:

### Test Case [ID]
- **Scenario**: [Short description]
- **Type**: [Positive/Negative/Edge]
- **Gherkin**:
\`\`\`gherkin
Feature: [Feature Name]
  Scenario: [Scenario Name]
    Given [Precondition]
    When [Action]
    Then [Expected Result]
\`\`\``;

  return `You are an expert QA Lead.
Your task is to write detailed **Functional Test Cases** for the following requirements or story.

Rules:
1. Do NOT generate implementation code. Generate manual test scenarios.
2. Cover Positive, Negative, Edge Case, and UI/UX scenarios.
${isGherkin ? gherkinInstructions : standardInstructions}

4. Ensure particular attention to business logic and user experience.

Input:
${userInput}`;
};

module.exports = { buildPrompt };
