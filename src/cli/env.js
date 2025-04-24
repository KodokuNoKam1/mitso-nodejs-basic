const parseEnv = () => {
    const envVars = Object.entries(process.env)
        .filter(([key, value]) => key.startsWith('MITSO_')) // Фильтруем по префиксу MITSO_
        .map(([key, value]) => `${key}=${value}`); // Форматируем как MITSO_name=value
    console.log(envVars.join('; '));
};

parseEnv();