const shuffle = () => {
  const assets = [
    { image: 'assets/css.png' },
    { image: 'assets/html5.png' },
    { image: 'assets/flutter.png' },
    { image: 'assets/node.png' },
    { image: 'assets/react.png' },
    { image: 'assets/sql.png' },
    { image: 'assets/ts.png' },
    { image: 'assets/js.png' },
  ];

  //including it twice because we need 2 of each of a matching game
  return [...assets, ...assets]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({
      ...card,
      id: Math.random(),
    }));
};

export default shuffle;
