DEF TEMP-TABLE ttErro
    FIELD codigo    AS CHAR
    FIELD mensagem  AS CHAR.
    
DEF TEMP-TABLE ttParam
    FIELD solicitacao                   AS CHAR
    FIELD clienteCodigo                 AS CHAR
    FIELD tipoAcaoDescricao             AS CHAR
    FIELD tipoAcaoCodigo                AS CHAR // sellout / sellin / vpc / spiff
    FIELD inicioAcao                    AS date
    FIELD terminoAcao                   AS date
    FIELD tipoQuantidade                AS CHAR // estimada / limitada
    FIELD tipoSellin                    AS CHAR // item / target
    FIELD tipoVpc                       AS CHAR // eventos / outros
    FIELD tipoSpiff                     AS CHAR // item / target
    FIELD descricaoDetalhada            AS CHAR

    FIELD valorTotalVerba               as dec
    FIELD gpMedioSugerido               as dec
    FIELD numControle                   as char
    FIELD dataAbertura                  as date
    FIELD solicitanteNome               as char
    FIELD solicitanteCodigo             as char

    field atividade                     as char // atividade em que se encontra no Fluig
    field responsavel                   as char // responsável pela atividade no Fluig
    FIELD statusAprovGerMarketing       as char
    FIELD dataAprovGerMarketing         as date
    FIELD userAprovGerMarketingNome     as char
    FIELD userAprovGerMarketingCodigo   as char
    FIELD obsAprovGerMarketing          as char
    FIELD statusAprovPresidenciaVp      as char
    FIELD dataAprovPresidenciaVp        as date
    FIELD userAprovPresidenciaVpNome    as char
    FIELD userAprovPresidenciaVpCodigo  as char
    FIELD obsAprovPresidenciaVp         as char.

def temp-table ttRateioCategoria
    field solicitacao           as char
    field categoriaCodigo       as char
    field categoriaDescricao    as char
    field perc                  as dec.

def temp-table ttSellout
    field solicitacao           as char
    field itemCodigo    as char
    field srpInicial    as dec
    field netInicial    as dec
    field gpInicial     as dec
    field srpSugerido   as dec
    field netSugerido   as dec
    field gpSugerido    as dec
    field rebateUnit    as dec
    field qtde          as dec
    field rebateTotal   as dec.

def temp-table ttSellinItem
    field solicitacao           as char
    field itemCodigo    as char
    field srpInicial    as dec
    field netInicial    as dec
    field gpInicial     as dec
    field srpSugerido   as dec
    field netSugerido   as dec
    field gpSugerido    as dec
    field rebateUnit    as dec
    field qtde          as dec
    field rebateTotal   as dec.

def temp-table ttSellinTarget
    field solicitacao           as char
    field descricao as char
    field target    as dec
    field qtde      as dec
    field perc      as dec
    field vlTarget  as dec
    field vlTotal   as dec.

def temp-table ttSellinTargetAc // aceleradores
    field solicitacao           as char
    field descricao as char
    field target    as dec
    field qtde      as dec
    field perc      as dec
    field vlTarget  as dec
    field vlTotal   as dec.

def temp-table ttSpiffItem
    field solicitacao           as char
    field itemCodigo    as char
    field spiffUnit     as dec
    field qtde          as dec
    field vlTotal       as dec.

def temp-table ttSpiffTarget
    field solicitacao           as char
    field foco      as char
    field target    as dec
    field qtde      as dec
    field vlUnit    as dec
    field vlTotal   as dec.

def temp-table ttVpcEvt
    field solicitacao           as char
    field nomeEvento    as char
    field finalidade    as char
    field inicio        as date
    field termino       as date
    field perc          as dec
    field vlTotal       as dec.

def temp-table ttVpcOutros
    field solicitacao           as char
    field tipo          as char
    field finalidade    as char
    field qtde          as dec
    field perc          as dec
    field vlTotal       as dec.

DEF TEMP-TABLE ttStatus
    FIELD retorno       AS CHAR.

DEFINE DATASET dsInput  FOR ttParam, ttRateioCategoria, ttSellout, ttSellinItem, ttSellinTarget, ttSellinTargetAc, ttSpiffItem, ttSpiffTarget, ttVpcEvt, ttVpcOutros.
DEFINE DATASET dsOutput FOR ttErro, ttStatus.

PROCEDURE piCria:

    DEF INPUT  PARAM wsInput    AS LONGCHAR NO-UNDO.
    DEF OUTPUT PARAM wsOutput   AS LONGCHAR NO-UNDO.

    DATASET dsInput:READ-JSON("LONGCHAR", wsInput).

    for each ttParam where ttParam.solicitacao <> "":
        for each ttRateioCategoria where 
            ttRateioCategoria.solicitacao = ttParam.solicitacao:

        end.
    end.
    
    create ttStatus.
    assign ttStatus.retorno = "OK".

    DATASET dsOutput:WRITE-JSON("LONGCHAR", wsOutput, FALSE).

END PROCEDURE.

PROCEDURE pi-cria-fluxo.

END. 

