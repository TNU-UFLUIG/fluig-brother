DEF TEMP-TABLE ttErro
    FIELD codigo    AS CHAR
    FIELD mensagem  AS CHAR.
    
DEF TEMP-TABLE ttParam
    FIELD codigo  AS CHAR
    FIELD descricao  AS CHAR.

DEFINE TEMP-TABLE ttItem
    FIELD codigo        LIKE ITEM.it-codigo
    field descricao     as char
    FIELD categoria     AS CHAR
    FIELD netInicial    AS CHAR 
    FIELD gpInicial     AS CHAR
    FIELD netSugerido   AS CHAR
    FIELD gpSugerido    AS CHAR
    FIELD rebateUnit    AS CHAR
    FIELD rebateTotal   AS CHAR
    FIELD dolar         AS CHAR
    FIELD ccusto        AS CHAR.

DEFINE DATASET dsInput  FOR ttParam.
DEFINE DATASET dsOutput FOR ttItem, ttErro.

PROCEDURE piBusca:

    DEF INPUT  PARAM wsInput    AS LONGCHAR NO-UNDO.
    DEF OUTPUT PARAM wsOutput   AS LONGCHAR NO-UNDO.

    DATASET dsInput:READ-JSON("LONGCHAR", wsInput).

    FIND FIRST ttParam NO-ERROR.
    IF AVAIL ttParam THEN DO:

        for each ITEM where 
            (ITEM.it-codigo matches "*" + ttParam.codigo + "*" or ttParam.codigo = "") and
            (ITEM.descricao?? matches "*" + ttParam.descricao + "*" or ttParam.descricao = "") NO-LOCK.
        
            create ttItem.
            ASSIGN ttItem.codigo        = ITEM.it-codigo
                   ttItem.descricao     = ""
                   ttItem.categoria     = ""
                   ttItem.netInicial    = ""
                   ttItem.gpInicial     = ""
                   ttItem.netSugerido   = ""
                   ttItem.gpSugerido    = ""
                   ttItem.rebateUnit    = ""
                   ttItem.rebateTotal   = ""
                   ttItem.dolar         = ""
                   ttItem.ccusto        = "".
        end.
    END.
    ELSE DO:
        CREATE ttErro.
        ASSIGN ttErro.codigo = "0"
               ttErro.mensagem = "Par�metros n�o informados".
    END.
    
    DATASET dsOutput:WRITE-JSON("LONGCHAR", wsOutput, FALSE).

END PROCEDURE.

