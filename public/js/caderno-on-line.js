Parse.initialize("caderno7259"); 
Parse.serverURL = 'https://caderno-on-line.herokuapp.com/parse';

var Instituicao = Parse.Object.extend("Instituicao");
var Disciplina = Parse.Object.extend("Disciplina");
var Anotacao = Parse.Object.extend("Anotacao");
var Curso = Parse.Object.extend("Curso");

Parse.Object.registerSubclass('Instituicao', Instituicao);
Parse.Object.registerSubclass('Disciplina', Disciplina);
Parse.Object.registerSubclass('Anotacao', Anotacao);
Parse.Object.registerSubclass('Curso', Curso);

/*var data = new Date();
console.log(data);

var instituicao = new Instituicao();
instituicao.set("nome", "Facol");
instituicao.set("descricao", "Descrição da Instituição");
instituicao.save(null, {
  success: function(obj) {
    alert('New object created with objectId: ' + obj.id);
  },
  error: function(obj, error) {
    alert('Failed to create new object, with error code: ' + error.message);
  }
});

var curso = new Curso();
curso.set("nome", "Sistemas de Informação 2");
curso.set("nomeCoordenador", "Cleyton Rodrigues");
curso.set("descricao", "Descrição do Curso");
curso.set("instituicao", instituicao);
curso.save(null).then(
  function(obj) {
    alert('New object created with objectId: ' + obj.id);

    var dias_aula = ["qua"];
    console.log(dias_aula);
    var disciplina = new Disciplina();
    disciplina.set("nome", "Jogos 2");
    disciplina.set("nomeProfessor", "Chicout");
    disciplina.set("descricao", "Descrição da Disciplina");
    disciplina.set("idCurso", curso); 
    disciplina.set("dias", dias_aula);
    return disciplina.save(null);
  },
  function(error) {
    alert('Failed to create new object, with error code: ' + error.message);
  }
).then(
  function(obj) {
    alert('New object created with objectId: ' + obj.id);
  },
  function(error) {
    alert('Failed to create new object, with error code: ' + error.message);
  }
);

var dias_aula = ["qua"];
console.log(dias_aula);
var disciplina = new Disciplina();
disciplina.set("nome", "Jogos");
disciplina.set("nomeProfessor", "Chicout");
disciplina.set("descricao", "Descrição da Disciplina");
disciplina.set("idCurso", curso); 
disciplina.set("dias", dias_aula);
disciplina.save(null, {
  success: function(obj) {
    alert('Objeto criado com o ID' + obj.id);
  },
  error: function(obj,error) {
    alert('Falha ao criar novo objeto, com código errado: ' +error.message);
  }
});

var anotacao = new Anotacao();
anotacao.set("assunto", "Introdução a Lua");
anotacao.set("texto", "Lua é uma linguagem criada no Brasil, no Rio de Janeiro, por...");
anotacao.set("dataAnotacao", data);
anotacao.set("disciplina", disciplina);
anotacao.save(null, {
  success: function(obj) {
    alert('New object created with objectId: ' + obj.id);
  },
  error: function(obj, error) {
    alert('Failed to create new object, with error code: ' + error.message);
  }
});*/
