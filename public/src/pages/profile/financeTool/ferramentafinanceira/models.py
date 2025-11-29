from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()
#gerenciamento do banco de dados
class Planejamento(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    #integer tipo de dado inteiro,chave primeira
    renda_mensal=db.Column(db.Float, nullable=False)
    #float o tipo de dado e nullable=false diz que o campo não pode ser nulo
    mes_ano=db.Column(db.String(7),nullable=False) 
    #string o tipo de dado e 7 o tamanho maximo do campo
    gastos = db.relationship('Gasto', backref='planejamento', lazy=True)
    #cria um relacionamento entre as tabelas planejamento e gasto, nao cria uma coluna no banco de dados
    #backref cria um atributo planejamento na classe gasto para descobrir qual planejamento o gasto pertence (lazer,alimentação) lazy true permite carregar os dados só quando permitir quando acessar meu_planejamento.gastos
class Categoria(db.Model):
        id=db.Column(db.Integer, primary_key=True)
        nome=db.Column(db.String(20),nullable=False)
        cor=db.Column(db.String(7))
        icone=db.Column(db.String(100))
        descricao=db.Column(db.String(100))

class Gasto(db.Model):
        id=db.Column(db.Integer,primary_key=True) #adiciona no banco
        planejamento_id=db.Column(db.Integer,db.ForeignKey('planejamento.id'))
        #herda o planejamento como chave estrangeira
        categoria_id=db.Column(db.Integer,db.ForeignKey('categoria.id'))
        valor=db.Column(db.Float,nullable=False)
        icone=db.Column(db.String(100))



        