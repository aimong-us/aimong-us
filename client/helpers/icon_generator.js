const iconGenerator = () => {
  const icons = [
    'among-us-green-png',
    'cyan-among-us-character',
    'red-among-us-png',
    'yellow-among-us',
  ];

  const index = Math.floor(Math.random() * icons.length);

  return icons[index];
};

export default iconGenerator;
