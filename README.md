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
- I didn't know if the project should be fully functional, anyways... I think I got too far in some things here.

## Process and Choices

Explanation of the development process, methodologies, technologies, or frameworks used. Discuss any important decisions made during development and the reasoning behind them.

- I wish I could use antd or even MUI, that would make the project way more faster than I would have done.
- In the process, I needed an css-in-js library due to some API specific colors, so I decided to install Styled-Components.
- Usually people don't use devices with dimension less than 320px (Unless you're a Galaxy Fold user), so I double checked if the page is fully responsive for Galaxy Fold users as well.
- Created an alias for every folder, it was becoming difficult to navigate between files.
- The SF Pro font is not open source and I think messing with Apple might not be a good idea, so I used Switzer instead, which is 95% similar to the SF Pro.
- I made my life so easier after creating a React Context for the basket/checkout item.
- Created the "product-edit-modal" to finally handle the product from basket and added the possibility to open the menu item from checkout
- Done.

## Contributing

Guidelines for others who might want to contribute to the project. Include information on how to submit issues, suggestions, or pull requests.

## License

MIT License

Copyright (c) 2023 Júlio César

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
