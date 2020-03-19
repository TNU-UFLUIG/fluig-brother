DEF TEMP-TABLE ttErro
    FIELD codigo    AS CHAR
    FIELD mensagem  AS CHAR.
    
DEF TEMP-TABLE ttParam
    FIELD codItem       AS CHAR
    field srpInicial    as dec
    field srpSugerido   as dec.

DEFINE TEMP-TABLE ttValores
    FIELD gpInicial     AS dec
    FIELD gpSugerido    as dec
    FIELD netInicial    AS dec
    field netSugerido   as dec
    field dolar         as dec.

DEFINE DATASET dsInput  FOR ttParam.
DEFINE DATASET dsOutput FOR ttValores, ttErro.

PROCEDURE piCalcula:

    DEF INPUT  PARAM wsInput    AS LONGCHAR NO-UNDO.
    DEF OUTPUT PARAM wsOutput   AS LONGCHAR NO-UNDO.

    DATASET dsInput:READ-JSON("LONGCHAR", wsInput).

    FIND FIRST ttParam NO-ERROR.
    IF AVAIL ttParam THEN DO:
        create ttValores.
        assign ttValores.gpInicial = 100.12
               ttValores.gpSugerido = 110.1
               ttValores.netInicial = 120.23
               ttValores.netSugerido = 130.95
               ttValores.dolar = 5.

    END.
    ELSE DO:
        CREATE ttErro.
        ASSIGN ttErro.codigo = "0"
               ttErro.mensagem = "Par�metros n�o informados".
    END.
    
    DATASET dsOutput:WRITE-JSON("LONGCHAR", wsOutput, FALSE).

END PROCEDURE.


