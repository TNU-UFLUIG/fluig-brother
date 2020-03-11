DEF TEMP-TABLE ttErro
    FIELD codigo    AS CHAR
    FIELD mensagem  AS CHAR.
    
DEF TEMP-TABLE ttParam
    FIELD codigo    AS CHAR
    FIELD descricao   AS CHAR.

DEFINE TEMP-TABLE ttContaContabil
    FIELD codigo    AS CHAR
    FIELD descricao   AS CHAR.

DEFINE DATASET dsInput  FOR ttParam.
DEFINE DATASET dsOutput FOR ttContaContabil, ttErro.

PROCEDURE piBusca:

    DEF INPUT  PARAM wsInput    AS LONGCHAR NO-UNDO.
    DEF OUTPUT PARAM wsOutput   AS LONGCHAR NO-UNDO.

    DATASET dsInput:READ-JSON("LONGCHAR", wsInput).

    FIND FIRST ttParam NO-ERROR.
    IF AVAIL ttParam THEN DO:

        for each cta_ctbl where 
            (cta_ctbl.cod_cta_ctbl matches "*" + ttParam.codigo + "*") and
            (cta_ctbl.des_tit_ctbl matches "*" + ttParam.descricao + "*") NO-LOCK.
            create ttContaContabil.
            ASSIGN ttContaContabil.codigo  = cta_ctbl.cod_cta_ctbl
                   ttContaContabil.descricao = cta_ctbl.des_tit_ctbl. 
        end.
    END.
    ELSE DO:
        CREATE ttErro.
        ASSIGN ttErro.codigo = "0"
               ttErro.mensagem = "Par�metros n�o informados".
    END.
    
    DATASET dsOutput:WRITE-JSON("LONGCHAR", wsOutput, FALSE).

END PROCEDURE.

