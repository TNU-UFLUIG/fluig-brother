DEF TEMP-TABLE ttErro
    FIELD codigo    AS CHAR
    FIELD mensagem  AS CHAR.
    
DEF TEMP-TABLE ttParam
    FIELD codigo    AS CHAR
    FIELD descricao AS CHAR.

DEFINE TEMP-TABLE ttCentroCusto
    FIELD codigo   AS CHAR
    FIELD descricao   AS CHAR.

DEFINE DATASET dsInput  FOR ttParam.
DEFINE DATASET dsOutput FOR ttCentroCusto, ttErro.

PROCEDURE piBusca:

    DEF INPUT  PARAM wsInput    AS LONGCHAR NO-UNDO.
    DEF OUTPUT PARAM wsOutput   AS LONGCHAR NO-UNDO.

    DATASET dsInput:READ-JSON("LONGCHAR", wsInput).

    FIND FIRST ttParam NO-ERROR.
    IF AVAIL ttParam THEN DO:

        for each ccusto where 
            (ccusto.cod_ccusto matches "*" + ttParam.codigo "*" or ttParam.codigo = "") and
            (ccusto.descricao matches "*" + ttParam.descricao "*" or ttParam.descricao = "").
            create ttCentroCusto.
            ASSIGN ttCentroCusto.codigo = ccusto.cod_ccusto   
                   ttCentroCusto.descricao = ccusto.des_tit_ctbl. 
        end.
    END.
    ELSE DO:
        CREATE ttErro.
        ASSIGN ttErro.codigo = "0"
               ttErro.mensagem = "Par�metros n�o informados".
    END.
    
    DATASET dsOutput:WRITE-JSON("LONGCHAR", wsOutput, FALSE).

END PROCEDURE.

