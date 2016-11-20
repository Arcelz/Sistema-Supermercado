var Supermercado = Supermercado || {};

Supermercado.CategoriaCadastroRapido = (function() {
	
	function CategoriaCadastroRapido() {
		this.modal = $('#cadastroCategoria');
		this.botaoSalvar = this.modal.find('#search-form');
		this.form = this.modal.find('form');
		this.url = this.form.attr('action');
		this.inputNome = $('#nome');		
		this.inputDescricao = $('#descricao');
		this.containerMensagemErro = $('.js-mensagem-cadastro-rapido-estilo');
	}
	
	CategoriaCadastroRapido.prototype.iniciar = function() {
		this.form.on('submit', function(event) { event.preventDefault() });
		this.modal.on('shown.bs.modal', onModalShow.bind(this));
		this.modal.on('hide.bs.modal', onModalClose.bind(this))
		this.botaoSalvar.on('click', onBotaoSalvarClick.bind(this));
	}
	
	function onModalShow() {
		this.inputNome.focus();
	}
	
	function onModalClose() {
		this.inputNome.val('');
		this.inputDescricao.val('');
		this.containerMensagemErro.addClass('hidden');
		this.form.find('.form-group').removeClass('has-error');
	}
	
	function onBotaoSalvarClick() {
		var enviar={}
		enviar["nome"] = this.inputNome.val();
		enviar["descricao"] = this.inputDescricao.val();
	
		
		$.ajax({
			url: this.url,
			method: 'POST',
			contentType: 'application/json',
			data : JSON.stringify(enviar),
			dataType : 'json',
			error: onErroSalvandoEstilo.bind(this),
			success: onEstiloSalvo.bind(this)
		});
	}
	
	function onErroSalvandoEstilo(obj) {
		var mensagemErro = obj.responseText;
		this.containerMensagemErro.removeClass('hidden');
		this.containerMensagemErro.html('<span>' + mensagemErro + '</span>');
		this.form.find('.form-group').addClass('has-error');
	}
	
	function onEstiloSalvo(cate) {
		var comboEstilo = $('#focusCategoria');
		comboEstilo.append('<option value=' + cate.id + '>' + cate.nome + '</option>');
		comboEstilo.val(cate.id);
		this.modal.modal('hide');
	}
	
	return CategoriaCadastroRapido;
	
}());

$(function() {
	var CategoriaCadastroRapido = new Supermercado.CategoriaCadastroRapido();
	CategoriaCadastroRapido.iniciar();
});