const path = require('path');

module.exports = { // arquivo de entrada, o primeiro a ser carregado
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'public'), // pasta de destino
    filename: "bundle.js" // o meu arquivao convertido
  },
  devServer: { // live reloader na pasta public
    contentBase: path.resolve(__dirname, 'public'),
  },
  module: {
    // passa um vetor (lista)
    rules: [
      // cada regra eh passada dentro de um objeto
      {
        test: /\.js$/, // uma string que precisa terminar em js
        exclude: /node_modules/, // se estiver aqui dentro n faz nada
        use: {
          loader: "babel-loader", // mas se n tiver usa esse loader
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use:
            [
              {loader: 'style-loader'},
              {loader: 'css-loader'},
            ]
      },
      {
        test: /.*\.(gif|png|jpe?g)$/i,
        use: {
          loader: "file-loader",
        }
      }
    ]
  },
};

// sim, path.resolve... eh a mesma coisa que colocar
// './src/index.js
// mas no windows ha a contra barra \\ e pode dar problemas
// para encontrar os arquivos, por isso usa-se o path
