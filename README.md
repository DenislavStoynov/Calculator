# Calculator
Node version - 22.12.0

NOTE: The commits in this repository appear under my other GitHub account because of unexpected switch of SSH keys.

## Setup
- npm install (instal dependencies)
- ng serve (start dev server)

## Run tests
- ng test

## Project Structure:
The architecture of the macOS portrait mode calculator is designed with modularity and scalability in mind by trying to follow the modern framework best practices. The core structure is as follows:

- /app: Root directory of the application.
- /components: Located within the /app directory, this folder contains all reusable UI components.
- /services: Also within /app, this folder houses service logic such as state management and local storage interactions.

## Page Sections:
- navigation
- calculator
- manager

## Styling
- each component is associated with its own CSS file to encapsulate styles and minimize redundancy.

## Components
### Calculator (four modular subcomponents)
- Main: Central component that handles calculator logic and renders the Header, Body and History components.
- Header: Includes UI elements mimicking macOS-style circular buttons and a font-awesome clock icon to toggle visibility between the Body and History.
- Body: Contains the display and all calculator input buttons.
- History: Displays the five most recent calculations using data from the history service.

### Manager
- A standalone route/component that displays the full calculation history.
- Includes functionality to delete individual history entries.

### Navigation
- Simple navigation bar with two links: Calculator and History Manager.
- Utilizes Angular’s RouterLink and RouterLinkActive directives for routing and active state indication, as defined in app.routes.ts.

## Services
### Calculator History Service:
- Manages the calculator’s history through reactive state (signals), local storage manipulation, and CRUD operations on entries.
- Exposes methods such as addEntry() and removeEntry() to interact with the history data.

## Application Logic
The main calculator component acts as the controller, containing all operation methods. A central calculation method is passed down to the Body component via props, establishing parent-child communication. When a calculation is triggered from the Body, an event is emitted back to the Main component, which performs the calculation, updates the result, and calls addEntry() from the history service to persist the data.

Similarly, interaction between Main and Header is handled through props and events. The clock button toggles visibility between the Body and History components.

The History component subscribes to the reactive signal managed by the history service and renders the five most recent calculations as read-only items.

The Manager component extends this functionality by displaying the full history and providing delete functionality. When a user removes an entry, the removeEntry() method is invoked to update both the signal state and local storage.

## Asumptions
- Supported operations: addition, subtraction, multiplication, division, negation and percent.
- Input is limited to 14 digits to prevent horizontal overflow off the display.
- Division by zero is handled by returning "Error".
- The calculator maintains a simple calculation history in local storage.
- Calculations are performed in the order entered.

## How the Calculator Algorithm Works
The calculator’s logic resides in the MainCalculatorComponent. It handles all state and operations related to input, arithmetic, and history tracking. Here's a breakdown:

### Input Handling
- insertNumber(op: string): Appends digits to the current result unless it exceeds 14 digits. Also resets the result if an operator was just selected.
- addDecimal(): Appends a decimal point if it doesn’t already exist in the current result.
- negate(): Multiplies the current result by -1 to toggle its sign.
- percent(): Converts the current number to a percentage by dividing by 100 and saves the result to history.

### Operator Handling
- setOperator(op: string): Stores the selected operator and the current result as previousResult. If an operation was already in progress, it performs it first.
- calcResult(): Performs the actual calculation using previousResult, the current input (result), and the stored operator.
- Special Controls
reset(): Clears all stored values and resets the display to 0.
- calculate(op: string): Central dispatcher for all button inputs—maps button symbols to their corresponding methods.

## Components Communication
Events and props connect the MainCalculatorComponent with BodyComponent(button inputs), HeaderComponent(toggle visibility), and HistoryComponent (displays last 5 calculations).

## Possible Edge Cases
- Division by Zero: Handled explicitly in calcResult() by returning "Error" if secondNum === 0.
- Multiple Decimal Points: Prevented by checking this.result.includes('.').
- Chained Operations: Intermediate results are handled if a user inputs, for example, 2 + 3 + 4 =
- Rapid Operator Switching: If a user switches operators before entering a new number, the last operator is overwritten.(not handeled)
- Result Overflow from Display: Input is limited to 14 characters to avoid UI/UX issues.
