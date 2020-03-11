DEF TEMP-TABLE ttErro
    FIELD codigo    AS CHAR
    FIELD mensagem  AS CHAR.
    
DEF TEMP-TABLE ttParam
    FIELD codigo        AS CHAR
    field razaoSocial   as char
    field cnpj          as char.

DEFINE TEMP-TABLE ttCliente
    FIELD codigo      AS CHAR
    FIELD razaoSocial LIKE emitente.nome-emit
    FIELD nomeAbrev   like emitente.nome-abrev
    FIELD cnpj        LIKE emitente.cgc
    FIELD executivo   AS CHAR
    FIELD subcanal    AS CHAR
    FIELD matriz      AS CHAR.

DEFINE DATASET dsInput  FOR ttParam.
DEFINE DATASET dsOutput FOR ttCliente, ttErro.

PROCEDURE piBusca:

    DEF INPUT  PARAM wsInput    AS LONGCHAR NO-UNDO.
    DEF OUTPUT PARAM wsOutput   AS LONGCHAR NO-UNDO.

    DATASET dsInput:READ-JSON("LONGCHAR", wsInput).

    FIND FIRST ttParam NO-ERROR.
    IF AVAIL ttParam THEN DO:

        for each emitente no-lock where
            (STRING(emitente.cod-emitente) matches "*" + ttParam.codigo + "*" or ttParam.codigo = "") and
            (STRING(emitente.nome-emit) matches "*" + ttParam.razaosocial + "*" or ttParam.razaosocial = "") and
            (STRING(emitente.cnpj) matches "*" + ttParam.cnpj + "*" or ttParam.cnpj = "").
            create ttCliente.
            ASSIGN ttCliente.codigo      = STRING(emitente.cod-emitente)
                   ttCliente.razaosocial = emitente.nome-emit
                   ttCliente.nomeabrev   = emitente.nome-abrev
                   ttCliente.cnpj        = emitente.cgc
                   ttCliente.executivo   = ""
                   ttCliente.subcanal    = ""
                   ttCliente.matriz      = IF emitente.nome-abrev = emitente.nome-matriz THEN "SIM" ELSE "NAO".
        end.
    END.
    ELSE DO:
        CREATE ttErro.
        ASSIGN ttErro.codigo = "0"
               ttErro.mensagem = "Par�metros n�o informados".
    END.
    
    DATASET dsOutput:WRITE-JSON("LONGCHAR", wsOutput, FALSE).

END PROCEDURE.

