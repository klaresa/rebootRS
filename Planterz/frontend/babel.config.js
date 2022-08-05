module.exports = {
  presets: [
      '@babel/preset-env', // converte js moderno para JS mais antigo com base nas funcionalidades que o browser ainda n entende (ambiente)
      '@babel/preset-react' // adiciona as funcionalidades do react na conversao para o JS para que o browser entenda
  ],
  plugins: [
      '@babel/plugin-transform-runtime'
  ]
};
