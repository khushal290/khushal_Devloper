        const API_KEY = '05c32e429733c6dd13570c5ada1dfe32'
        const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

        const cityInput = document.getElementById('cityInput');
        const searchBtn = document.getElementById('searchBtn');
        const locationBtn = document.getElementById('locationBtn');
        const loading = document.getElementById('loading');
        const error = document.getElementById('error');
        const weatherInfo = document.getElementById('weatherInfo');

        const cityName = document.getElementById('cityName');
        const weatherIcon = document.getElementById('weatherIcon');
        const temperature = document.getElementById('temperature');
        const description = document.getElementById('description');
        const feelsLike = document.getElementById('feelsLike');
        const humidity = document.getElementById('humidity');
        const windSpeed = document.getElementById('windSpeed');
        const pressure = document.getElementById('pressure');

        searchBtn.addEventListener('click', () => {
            const city = cityInput.value.trim();
            if (city) {
                getWeatherByCity(city);
            }
        });

        cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const city = cityInput.value.trim();
                if (city) {
                    getWeatherByCity(city);
                }
            }
        });

        locationBtn.addEventListener('click', getCurrentLocation);

        function showLoading() {
            loading.style.display = 'block';
            weatherInfo.classList.remove('show');
            error.style.display = 'none';
        }

        function hideLoading() {
            loading.style.display = 'none';
        }

        function showError(message) {
            error.textContent = message;
            error.style.display = 'block';
            weatherInfo.classList.remove('show');
        }

        async function getWeatherByCity(city) {
            if (API_KEY === 'YOUR_API_KEY_HERE') {
                showError('Please add your OpenWeatherMap API key to use this application. Get a free key at openweathermap.org');
                return;
            }

            showLoading();

            try {
                const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
                
                if (!response.ok) {
                    throw new Error('City not found');
                }

                const data = await response.json();
                displayWeather(data);
            } catch (err) {
                showError('City not found. Please check the spelling and try again.');
            } finally {
                hideLoading();
            }
        }

        async function getWeatherByCoords(lat, lon) {
            if (API_KEY === 'YOUR_API_KEY_HERE') {
                showError('Please add your OpenWeatherMap API key to use this application.');
                return;
            }

            showLoading();

            try {
                const response = await fetch(`${API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
                
                if (!response.ok) {
                    throw new Error('Weather data not available');
                }

                const data = await response.json();
                displayWeather(data);
            } catch (err) {
                showError('Unable to fetch weather data. Please try again.');
            } finally {
                hideLoading();
            }
        }

        function displayWeather(data) {
            cityName.textContent = `${data.name}, ${data.sys.country}`;
            temperature.textContent = `${Math.round(data.main.temp)}°C`;
            description.textContent = data.weather[0].description;
            feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
            humidity.textContent = `${data.main.humidity}%`;
            windSpeed.textContent = `${data.wind.speed} m/s`;
            pressure.textContent = `${data.main.pressure} hPa`;

            const iconCode = data.weather[0].icon;
            weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            weatherIcon.alt = data.weather[0].description;

            weatherInfo.classList.add('show');
            error.style.display = 'none';
        }

        function getCurrentLocation() {
            if (navigator.geolocation) {
                showLoading();
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        getWeatherByCoords(latitude, longitude);
                    },
                    (err) => {
                        hideLoading();
                        showError('Unable to get your location. Please search for a city manually.');
                    }
                );
            } else {
                showError('Geolocation is not supported by this browser.');
            }
        }

        window.addEventListener('load', () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        getWeatherByCoords(latitude, longitude);
                    },
                    () => {
                        getWeatherByCity('agra');
                    }
                );
            } else {
                getWeatherByCity('agra');
            }
        });