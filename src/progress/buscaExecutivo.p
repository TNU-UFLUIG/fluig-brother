DEF TEMP-TABLE ttErro
    FIELD codigo    AS CHAR
    FIELD mensagem  AS CHAR.
    
DEF TEMP-TABLE ttParam
    FIELD codigo        AS CHAR
    field nome          as char.

DEFINE TEMP-TABLE ttGestor
    FIELD codigo      AS CHAR
    FIELD nome        AS CHAR
    FIELD email       AS CHAR.

DEFINE DATASET dsInput  FOR ttParam.
DEFINE DATASET dsOutput FOR ttGestor, ttErro.

PROCEDURE piBusca:

    DEF INPUT  PARAM wsInput    AS LONGCHAR NO-UNDO.
    DEF OUTPUT PARAM wsOutput   AS LONGCHAR NO-UNDO.

    DATASET dsInput:READ-JSON("LONGCHAR", wsInput).

    FIND FIRST ttParam NO-ERROR.
    IF AVAIL ttParam THEN DO:

        for each es-executivo-conta no-lock where
            (STRING(es-executivo-conta.codigo) matches "*" + ttParam.codigo + "*" or ttParam.codigo = "") and
            (STRING(es-executivo-conta.nome) matches "*" + ttParam.nome + "*" or ttParam.nome = "").
            
            create ttGestor.
            ASSIGN ttGestor.codigo      = STRING(es-executivo-conta.codigo)
                   ttGestor.nome        = es-executivo-conta.nome
                   ttGestor.email       = es-executivo-conta.e-mail.
        end.
    END.
    ELSE DO:
        CREATE ttErro.
        ASSIGN ttErro.codigo = "0"
               ttErro.mensagem = "Parametros nao informados".
    END.
    
    DATASET dsOutput:WRITE-JSON("LONGCHAR", wsOutput, FALSE).

END PROCEDURE.

