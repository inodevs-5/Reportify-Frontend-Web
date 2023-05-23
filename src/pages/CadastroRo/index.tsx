import Menu from "../../components/menus";

function CadastroRo () {
return(
<div className="flex flex-wrap flex-row">
    <div>
    <Menu/>
    </div>
    {/* {conteudo fica aqui} */}
    <div className="mt-16 bg-white flex-1 ">
      <div className="p-10 flex flex-col ">
        <h1 className="text-xl text-black font-semibold">
          Novo Registro de Ocorrência
        </h1>
        <div className="flex flex-col ">
        <p>Contrato:<input className="w-3/4 bg-slate-600" type="text" /></p>
        <div className="h-1 justify-end w-3/4 bg-black"></div>
        </div>
      </div>
  </div>
</div>
);
}export default CadastroRo