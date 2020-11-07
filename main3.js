//axios.get, axios.put, axios.delete, axios.post, com mais parâmetros
//basta consultar a documentação do axios pra mais informações
axios.get('https://api.github.com/users/alexandrobs')

    .then(function (response) {
       console.log(response);
       console.log(response.data.avatar_url); 
    })
    .catch(function (error){
        console.warn(error);
    });