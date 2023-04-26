

const MiComponente = ({ nombre }) => `
  <div>
    <h1>${nombre}</h1>
    <p>Bienvenido a mi sitio web!</p>
  </div>
`

const App = () => {
    return (
      <div>
        <MiComponente nombre="Juan" />
      </div>
    );
  };

export default App;