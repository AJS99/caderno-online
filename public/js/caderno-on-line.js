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


var disciplina = new Disciplina();
disciplina.set("nome", 'Jogos');
disciplina.set("nomeProfessor", 'Chicout');
disciplina.set("descricao", 'Teste test teste');
disciplina.set("diasAula", ["seg", "ter"]);

var anotacao = new Anotacao();
anotacao.set("assunto", 'Jogos Antigos');
anotacao.set("texto", 'Teste test teste');
anotacao.set("data", Date.now());