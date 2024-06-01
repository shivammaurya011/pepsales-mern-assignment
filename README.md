# LiveTrade.

LiveTrade. is a responsive web application that allows users to view and analyze cryptocurrency data. The app provides a search functionality, grid and list views, and various filtering options.

## Features

- **Search Functionality:** Easily search for specific cryptocurrencies.
- **Grid and List Views:** Switch between grid and list views for a different layout experience.
- **Filtering Options:** Filter data by days and price type.
- **Responsive Design:** Optimized for both desktop and mobile devices.

## Screenshots

![image](https://github.com/shivammaurya011/pepsales-mern-assignment/assets/71092987/918effc2-84e4-411f-84fd-e90fffed5c10)
![image](https://github.com/shivammaurya011/pepsales-mern-assignment/assets/71092987/34b1125c-50e2-40a9-8b68-965c324e63ea)
![image](https://github.com/shivammaurya011/pepsales-mern-assignment/assets/71092987/2e15790b-eba5-47f3-aecb-c8701e9957a4)


## Installation

Follow these steps to set up the project locally:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/coin-dashboard.git
    ```

2. **Navigate to the project directory:**
    ```bash
    cd coin-dashboard
    ```

3. **Install dependencies:**
    ```bash
    npm install
    ```

4. **Start the development server:**
    ```bash
    npm start
    ```

    The application will be running at `http://localhost:3000`.

## Usage

1. **Search for cryptocurrencies:**
   - Use the search bar at the top to find specific coins by name or symbol.

2. **Toggle between views:**
   - Use the "Grid" and "List" tabs to switch between different layout views.

3. **Filter data:**
   - Use the dropdown menus to filter by days and price type.

## Components

- **Dashboard:** The main component that renders the search bar, tabs for grid and list views, and the corresponding view component.
- **CoinGrid:** Displays cryptocurrencies in a grid layout.
- **CoinList:** Displays cryptocurrencies in a list layout.

## Code Overview

### `Dashboard.js`
The main container component that manages state and handles data fetching and filtering.

### `CoinGrid.js`
Renders the cryptocurrency data in a grid format.

### `CoinList.js`
Renders the cryptocurrency data in a list format.

### `redux/coinSlice.js`
Contains Redux logic for managing coin data state.

### `utils/getData.js`
Utility function for fetching cryptocurrency data from the API.

## Contributing

Contributions are welcome! Follow these steps to contribute:

1. **Fork the repository.**
2. **Create a new branch:**
    ```bash
    git checkout -b feature/your-feature-name
    ```
3. **Make your changes.**
4. **Commit your changes:**
    ```bash
    git commit -m 'Add some feature'
    ```
5. **Push to the branch:**
    ```bash
    git push origin feature/your-feature-name
    ```
6. **Create a pull request.**

## Contact

For any questions or feedback, please contact [shivammaurya011@gmail.com](mailto:shivammaurya011@gmail.com).

---

**Happy Coding!**
