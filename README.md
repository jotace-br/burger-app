# Burger App

## Description

A brief overview of what the project does, its purpose, and its main functionalities.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Assumptions](#assumptions)
- [Process and Choices](#process-and-choices)
- [Contributing](#contributing)
- [License](#license)

## Installation

Step-by-step instructions on how to install and set up the project locally. Include any dependencies or prerequisites that users need to have installed before running the code.

```bash
# Example installation steps
$ git clone https://github.com/your_username/project.git
$ cd project
$ npm install   # Or any other relevant commands for setup like yarn, pnpm or bun
```

## Usage

Instructions on how to use the project once it's set up. Include examples or code snippets to demonstrate its functionality.

```bash
# Example usage
$ yarn dev   # Or any other relevant commands for running the code (e.g: npm run dev)
```

## Assumptions

List any assumptions made during the development of the project. This could include specific system requirements, expected input formats, or any other relevant details.

- Since the list of tecnologies/libs i can use is limited, I thought about using antd at first, but then I decided to go full with pure HTML/CSS, just to make my code easier to review.
- There are some problems when I was coding this project, first one was using color variables from API, some specific classes cannot get the desired color by simply passing via style prop, so I decided to install Styled-Components to make sure those colors are used correctly.
- ...

## Process and Choices

Explanation of the development process, methodologies, technologies, or frameworks used. Discuss any important decisions made during development and the reasoning behind them.

- I wish I could use antd or even MUI, that would make the project way more faster than I would have done.
- In the process, I needed an css-in-js library due to some API specific colors, so I decided to install Styled-Components.
- Usually people don't use devices with dimension less than 320px (Unless you're a Galaxy Fold user), so I double checked if the page is fully responsive for Galaxy Fold users as well.
- Created an alias for every folder, it was becoming difficult to navigate between files.

## Contributing

Guidelines for others who might want to contribute to the project. Include information on how to submit issues, suggestions, or pull requests.

## License

Specify the project's license information.

---

Feel free to customize this template based on your specific project details and requirements. Adding sections like troubleshooting, acknowledgments, or additional resources can also be helpful depending on the nature of your project.
