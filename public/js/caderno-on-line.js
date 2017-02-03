Parse.initialize("caderno7259"); 
Parse.serverURL = 'http://caderno-on-line.herokuapp.com/parse';

var Instituicao = Parse.Object.extend("Instituicao");
var Curso = Parse.Object.extend("Curso");
var Disciplina = Parse.Object.extend("Disciplina");
var Anotacao = Parse.Object.extend("Anotacao");

Parse.Object.registerSubclass('Instituicao', Instituicao);
Parse.Object.registerSubclass('Curso', Curso);
Parse.Object.registerSubclass('Disciplina', Disciplina);
Parse.Object.registerSubclass('Anotacao', Anotacao);

console.log("Começou Instituicao salvando");

var instituicao = new Instituicao();
instituicao.set("nome", 'Facol');
instituicao.set("descricao", 'Teste test teste');
instituicao.save(null, {
  success: function(obj) {
    alert('New object created with objectId: ' + obj.id);
  },
  error: function(obj, error) {
    alert('Failed to create new object, with error code: ' + error.message);
  }
});

console.log("Próximo é Curso");

var curso = new Curso();
curso.set("nome", 'Sistemas de Informação');
curso.set("nomeCoordenador", 'Cleyton');
curso.set("descricao", 'Teste test teste');
curso.set("instituicao", instituicao);
curso.save(null, {
  success: function(obj) {
    alert('New object created with objectId: ' + obj.id);
  },
  error: function(obj, error) {
    alert('Failed to create new object, with error code: ' + error.message);
  }
});

console.log("Proximo é Disciplina");

var disciplina = new Disciplina();
disciplina.set("nome", 'Jogos');
disciplina.set("nomeProfessor", 'Chicout');
disciplina.set("descricao", 'Teste test teste');
disciplina.set("diasAula", 'qua'); // NÃO FUNCIONOU COMO ARRAY - ERRO 400 BAD REQUET
//disciplina.set("curso", curso); NÃO CONSEGUE CRIAR A RELAÇÃO COM 'CURSO' - VER DEPOIS O PROBLEMA... 
disciplina.save(null, {
  success: function(obj) {
    alert('New object created with objectId: ' + obj.id);
  },
  error: function(obj, error) {
    alert('Failed to create new object, with error code: ' + error.message);
  }
});

console.log("Próximo é Anotação");

var anotacao = new Anotacao();
anotacao.set("assunto", 'Jogos Antigos');
anotacao.set("texto", 'Teste test teste');
anotacao.set("data", Date.now());
anotacao.set("disciplina", disciplina);
anotacao.save(null, {
  success: function(obj) {
    alert('New object created with objectId: ' + obj.id);
  },
  error: function(obj, error) {
    alert('Failed to create new object, with error code: ' + error.message);
  }
});

console.log("Final do Script");