# Life Expectancy Predictor

The **Life Expectancy Predictor** is a React-based application that predicts life expectancy using machine learning models. The user provides input data such as year, country, gender, GDP, population statistics, and tuberculosis treatment data. Based on the selected model, predictions are made and displayed to the user.

## Features

- Dynamic form for user input.
- Real-time country list fetched from an API.
- Multiple machine learning models to choose from, including Linear Regression, Gradient Boosting, Random Forest, and an Ensemble model.
- Displays prediction results in an intuitive format.
- User-friendly interface with a responsive design.

## Requirements

### Frontend

- React (18.0 or higher)
- TypeScript
- Tailwind CSS
- Axios
- Lucide-react (icons)

### Backend

- API endpoint to fetch the list of countries (`api/countries`).
- API endpoint to handle prediction requests (`api/predict`).

### Environment

- Node.js
- NPM

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/adityainhub/life-expectancy-predictor.git
   cd life-expectancy-predictor
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

   Or, if using Yarn:

   ```bash
   yarn install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

   Or, with Yarn:

   ```bash
   yarn start
   ```

4. Open the application in your browser at:

   ```
   http://localhost:5173
   ```

## Project Structure

```
.
├── public
│   ├── index.html          # Main HTML template
├── src
│   ├── components          # Reusable React components
│   ├── App.tsx             # Main App component
│   ├── index.tsx           # Application entry point
│   ├── styles.css          # Tailwind CSS setup
├── package.json            # Project dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
```

## API Endpoints

### `GET /api/countries`

Fetches the list of available countries.

- **Response:**
  ```json
  {
    "countries": ["India", "United States", "Australia"]
  }
  ```

### `POST /api/predict`

Accepts user input and returns the life expectancy prediction.

- **Request Body:**
  ```json
  {
    "year": "2025",
    "country": "India",
    "gender": "Female",
    "tuberculosisTreatment": "5",
    "hospitalBeds": "2",
    "urbanPopulation": "50",
    "ruralPopulation": "50",
    "gdp": "2000",
    "model": "ensemble"
  }
  ```
- **Response:**
  ```json
  {
    "prediction": 75.3
  }
  ```

## Usage Instructions

1. Fill in the input fields for year, country, gender, tuberculosis treatment, hospital beds, urban and rural population, and GDP.
2. Select one of the machine learning models.
3. Click **Predict Life Expectancy** to calculate the prediction.
4. The result will be displayed below the form.

## Dependencies

- **React**: Frontend framework for building the user interface.
- **Tailwind CSS**: For styling the application.
- **Axios**: For making API requests.
- **Lucide-react**: For icons used in the application.

## Screenshots


*Hero section with an intuitive design and information about the application.*


*Form section for user inputs and model selection.*


*Display of the prediction result.*

## Future Improvements

- Add validation for more edge cases in user input.
- Support additional models and datasets.
- Integrate loading animations for better user experience.
- Provide insights into the factors affecting life expectancy.

## License

This project is licensed under the MIT License. Feel free to use and modify it as per your needs.

## Author

[Kumar Aditya](https://github.com/adityainhub)

Kumar Aditya