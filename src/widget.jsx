import { useState, useEffect } from 'react';

const locations = ["012010", "016010", "014020", "050010", "040010", "150010", "170010", "130010", "200010", "230010", "270000", "340010", "390010", "400010", "460010", "471010"];

export default function Widget() {
  const [forecasts, setForecasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (forecasts.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % forecasts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [forecasts]);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const promises = locations.map(async (loc) => {
          const res = await fetch(`https://weather.tsukumijima.net/api/forecast/city/${loc}`);
          const data = await res.json();

          const forecast = data.forecasts[0];
          const icon = forecast.image.url;

          // const minTemp = forecast.temperature.min.celsius;
          const minTemp = '11';
          // const maxTemp = forecast.temperature.max.celsius;
          const maxTemp = '11';

          return {
            name: data.location.city,
            icon,
            minTemp: minTemp !== null ? minTemp : '-',
            maxTemp: maxTemp !== null ? maxTemp : '-',
          };
        });

        const results = await Promise.all(promises);
        setForecasts(results);
      } catch (error) {
        console.error("Failed to fetch weather data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) return <div>読み込み中...</div>;

  if (forecasts.length === 0) return null;

  const forecast = forecasts[currentIndex];

  return (
    <div className="weather-forecast" style={{ width:'100%' }}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div 
        key={forecast.name} 
        className="forecast-card"
        style={{ 
          animation: 'fadeIn 1s ease-out',
          display: 'flex',
          width: '100%',
        }}
      >
        <div style={{width:'50cqw', marginTop: 'auto', marginBottom: 'auto'}}>
          <div>
            <h3 style={{margin:0, padding:0, fontSize: '12cqw', color: '#555'}}>{forecast.name}</h3>
          </div>
          <div className="details" style={{ fontSize: '8cqw', color: '#555' }}>
            <p style={{ margin:0, padding:0 }}><span style={{color: 'blue'}}>{forecast.minTemp}℃</span> / <span style={{color: 'red'}}>{forecast.maxTemp}℃</span></p>
          </div>
        </div>
        <div style={{width: '50cqw'}}>
          <img
            src={forecast.icon}
            alt="weather icon"
            style={{ objectFit: 'contain' , width: '100%'}}
          />
        </div>
      </div>
    </div>
  );
}