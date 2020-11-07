import api from './api';

class App {
    constructor() {
        this.repositories = [];
        this.formEl = document.getElementById('form-list');
        this.inputEl = document.querySelector('input[name=repository]');
        this.repoLi = document.getElementById('repo-list');
        this.registryHandlers();
    }

    registryHandlers(){
        //no event como é um único parâmetro, então não precisa de parênteses
        //é só uma linha no escopo da função então tira as chaves e joga na frente da flecha
        // this.formEl.onsubmit = function (event) {
        //     this.addRepository(event);
        // }
        //ai ficaria assim:
        this.formEl.onsubmit = event => this.addRepository(event);
    }

    setLoading(loading = true){
        if(loading === true){
            let loadEl = document.createElement('span');
            loadEl.appendChild(document.createTextNode('Carregando'));
            loadEl.setAttribute('id', 'loading');

            this.formEl.appendChild(loadEl);
        }else{
            document.getElementById('loading').remove();
        }
    }

    async addRepository(event){
        event.preventDefault();

        const repoInput = this.inputEl.value;

        if(repoInput.lenght === 0)
            return;


        this.setLoading();

            try{
          const response = await api.get(`/repos/${repoInput}`);

        //  console.log(response);
          const { name, description, html_url, owner:{ avatar_url }} = response.data;

        this.repositories.push({
            // name: 'github.com/alexandrobs',
            // description: 'Fogo na Babilônia',
            // avatar_url: 'https://avatars2.githubusercontent.com/u/6578675?v=4',
            // html_url: 'https://github.com/alexandrobs'
            name,
            description,
            avatar_url,
            html_url,
        });

        this.inputEl.value = '';

        this.render();
    }catch(err){
        alert('O repositório não existe');
    }
        this.setLoading(false);
        //console.log(this.repositories);
    }

    render(){
        this.repoLi.innerHTML = '';
        this.repositories.forEach( repo => {

            let imgEl = document.createElement('img');
            imgEl.setAttribute('src', repo.avatar_url);

            let titleEl = document.createElement('strong');
            titleEl.appendChild(document.createTextNode(repo.name));

            let descriEl = document.createElement('p');
            descriEl.appendChild(document.createTextNode(repo.description));

            let linkEl = document.createElement('a');
            linkEl.setAttribute('target','_blank');
            linkEl.setAttribute('href',repo.html_url);
            linkEl.appendChild(document.createTextNode('Acessar'));

            let listItemEl = document.createElement('li');
            listItemEl.appendChild(imgEl);
            listItemEl.appendChild(titleEl);
            listItemEl.appendChild(descriEl);
            listItemEl.appendChild(linkEl);

            this.repoLi.appendChild(listItemEl);

        });
    }
}

new App();