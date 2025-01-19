import React, { useState, useEffect } from 'react';
import { Brain, Activity, LineChart, GitMerge, HeartPulse } from 'lucide-react';
import axios from 'axios';

interface PredictionForm {
  year: string;
  country: string;
  gender: string;
  tuberculosisTreatment: string;
  hospitalBeds: string;
  urbanPopulation: string;
  ruralPopulation: string;
  gdp: string;
  model: string;
}

const initialFormState: PredictionForm = {
  year: '',
  country: '',
  gender: 'Female',
  tuberculosisTreatment: '',
  hospitalBeds: '',
  urbanPopulation: '',
  ruralPopulation: '',
  gdp: '',
  model: 'ensemble'
};

function App() {
  const [form, setForm] = useState<PredictionForm>(initialFormState);
  const [prediction, setPrediction] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [countries, setCountries] = useState<string[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://web-production-69fc2.up.railway.app/api/countries');
        setCountries(response.data.countries);
      } catch (err) {
        console.error('Failed to fetch countries:', err);
      }
    };

    fetchCountries();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('https://web-production-69fc2.up.railway.app/api/predict', form);
      setPrediction(response.data.prediction);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to get prediction. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const models = [
    { id: 'linear', name: 'Linear Regression', icon: LineChart },
    { id: 'gradient', name: 'Gradient Boosting', icon: Activity },
    { id: 'random_forest', name: 'Random Forest', icon: Brain },
    { id: 'ensemble', name: 'Ensemble Model', icon: GitMerge },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div 
        className="relative bg-cover bg-center h-[400px]" 
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-50"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
          <HeartPulse className="w-16 h-16 mb-6 text-blue-400" />
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Life Expectancy Predictor</h1>
          <p className="text-xl md:text-2xl text-center max-w-2xl text-blue-100">
            Discover life expectancy predictions using advanced machine learning models
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-2xl p-8 backdrop-blur-lg bg-opacity-90">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Year</label>
                <input
                  type="number"
                  name="year"
                  value={form.year}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Country</label>
                <select
                  name="country"
                  value={form.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  required
                >
                  <option value="">Select a country</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  required
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tuberculosis Treatment</label>
                <input
                  type="number"
                  name="tuberculosisTreatment"
                  value={form.tuberculosisTreatment}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Hospital Beds</label>
                <input
                  type="number"
                  name="hospitalBeds"
                  value={form.hospitalBeds}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Urban Population</label>
                <input
                  type="number"
                  name="urbanPopulation"
                  value={form.urbanPopulation}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Rural Population</label>
                <input
                  type="number"
                  name="ruralPopulation"
                  value={form.ruralPopulation}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">GDP</label>
                <input
                  type="number"
                  name="gdp"
                  value={form.gdp}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  required
                />
              </div>
            </div>
          </div>

          <div className="mt-8">
            <label className="block text-sm font-semibold text-gray-700 mb-4">Select Model</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {models.map(({ id, name, icon: Icon }) => (
                <label
                  key={id}
                  className={`flex flex-col items-center p-4 border rounded-xl cursor-pointer transition-all hover:shadow-md
                    ${form.model === id 
                      ? 'border-blue-500 bg-blue-50 shadow-inner' 
                      : 'border-gray-200 hover:border-blue-200'}`}
                >
                  <input
                    type="radio"
                    name="model"
                    value={id}
                    checked={form.model === id}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <Icon className={`w-8 h-8 mb-3 ${form.model === id ? 'text-blue-500' : 'text-gray-400'}`} />
                  <span className={`text-sm text-center ${form.model === id ? 'text-blue-700 font-medium' : 'text-gray-600'}`}>
                    {name}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium text-lg"
            >
              {loading ? 'Calculating Prediction...' : 'Predict Life Expectancy'}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-6 p-6 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-600 text-center">{error}</p>
          </div>
        )}

        {prediction !== null && !error && (
          <div className="mt-6 p-8 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl text-center">
            <h3 className="text-xl font-semibold text-green-800 mb-3">Prediction Result</h3>
            <p className="text-4xl font-bold text-green-600">{prediction.toFixed(2)} years</p>
            <p className="mt-2 text-green-600 opacity-75">Estimated Life Expectancy</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;