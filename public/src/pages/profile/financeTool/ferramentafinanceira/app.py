# Importa as ferramentas
from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
from models import db, Planejamento,Categoria, Gasto

# Cria o aplicativo Flask
app = Flask(__name__)

# Permite que frontend e backend conversem
CORS(app)

# Configura onde salvar o banco de dados
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///financeiro.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Conecta o banco de dados ao app
db.init_app(app)

# Cria as tabelas no banco (roda uma vez)
with app.app_context():
    db.create_all()
    
    if Categoria.query.count() == 0:
        categorias = [
            Categoria(nome='Moradia', cor='#8B5CF6', icone='icon-moradia.png'),
            Categoria(nome='Alimentação', cor='#EC4899', icone='icon-alimentacao.png'),
            Categoria(nome='Transporte', cor='#F59E0B', icone='icon-transporte.png'),
            Categoria(nome='Saúde', cor='#10B981', icone='icon-saude.png'),
            Categoria(nome='Educação', cor='#3B82F6', icone='icon-educacao.png'),
            Categoria(nome='Lazer', cor='#F43F5E', icone='icon-lazer.png'),
            Categoria(nome='Outros', cor='#F50B0B', icone='icon-outros.png')
        ]
        db.session.add_all(categorias)
        db.session.commit()

# Rota principal - mostra a página
@app.route('/')
def home():
    return render_template('index.html')

# Rota pra pegar todas as categorias
@app.route('/api/categorias', methods=['GET'])
def obter_categorias():
    categorias = Categoria.query.all()
    return jsonify([{
        'id': c.id,
        'nome': c.nome,
        'cor': c.cor,
        'icone': c.icone
    } for c in categorias])

# Rota pra criar um novo planejamento
@app.route('/api/planejamento', methods=['POST'])
def criar_planejamento():
    dados = request.json  # Pega os dados enviados
    
    novo = Planejamento(
        renda_mensal=dados['renda_mensal'],
        mes_ano=dados['mes_ano']
    )
    
    db.session.add(novo)  # Adiciona no banco
    db.session.commit()  # Salva
    
    return jsonify({'id': novo.id, 'mensagem': 'Criado com sucesso!'}), 201

# Rota pra adicionar um gasto
@app.route('/api/gasto', methods=['POST'])
def adicionar_gasto():
    dados = request.json
    
    novo_gasto = Gasto(
        planejamento_id=dados['planejamento_id'],
        categoria_id=dados['categoria_id'],
        valor=dados['valor']
    )
    
    db.session.add(novo_gasto)
    db.session.commit()
    
    return jsonify({'id': novo_gasto.id, 'mensagem': 'Gasto adicionado!'}), 201

# Rota pra pegar relatório completo
@app.route('/api/relatorio/<int:planejamento_id>', methods=['GET'])
def obter_relatorio(planejamento_id):
    planejamento = Planejamento.query.get_or_404(planejamento_id)
    
    gastos_por_categoria = []
    total_gastos = 0
    
    for gasto in planejamento.gastos:
        categoria = Categoria.query.get(gasto.categoria_id)
        gastos_por_categoria.append({
            'categoria': categoria.nome,
            'cor': categoria.cor,
            'valor': gasto.valor
        })
        total_gastos += gasto.valor
    
    return jsonify({
        'renda_mensal': planejamento.renda_mensal,
        'total_gastos': total_gastos,
        'saldo': planejamento.renda_mensal - total_gastos,
        'gastos': gastos_por_categoria
    })

# Inicia o servidor
if __name__ == '__main__':
    app.run(debug=True)