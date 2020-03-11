DEF TEMP-TABLE ttErro
    FIELD codigo    AS CHAR
    FIELD mensagem  AS CHAR.
    
DEF TEMP-TABLE ttParam
    FIELD solicitacao  AS CHAR
    FIELD valorTotal   AS DECIMAL.

DEFINE TEMP-TABLE ttTitulos
    FIELD codEstab      AS CHAR
    FIELD codEspec      AS CHAR
    FIELD codSerie      AS CHAR
    FIELD numTitulo     AS CHAR
    FIELD parcela       AS CHAR
    FIELD valorAntecipado  AS DECIMAL.

DEFINE TEMP-TABLE ttRetorno
    FIELD codEstab      AS CHAR
    FIELD codEspec      AS CHAR
    FIELD codSerie      AS CHAR
    FIELD numTitulo     AS CHAR
    FIELD parcela       AS CHAR
    FIELD valorTotal       AS DECIMAL.
     
DEFINE DATASET dsInput  FOR ttParam, ttTitulos.
DEFINE DATASET dsOutput FOR ttRetorno, ttErro.

PROCEDURE piCria:

    DEF INPUT  PARAM wsInput    AS LONGCHAR NO-UNDO.
    DEF OUTPUT PARAM wsOutput   AS LONGCHAR NO-UNDO.

    DATASET dsInput:READ-JSON("LONGCHAR", wsInput).

    FIND FIRST ttParam NO-ERROR.
    IF AVAIL ttParam THEN DO:
        /*
        movto_ocor_bcia
        num_id_tit_acr
        num_id_movto_tit_acr
        log_confir_movto_envdo_bco
        ind_tip_ocor_bcia
        
        */

        RUN pi-cria-antecipacao.
    END.
    ELSE DO:
        CREATE ttErro.
        ASSIGN ttErro.codigo = "0"
               ttErro.mensagem = "Par�metros n�o informados".
    END.
    
    DATASET dsOutput:WRITE-JSON("LONGCHAR", wsOutput, FALSE).

END PROCEDURE.

PROCEDURE pi-cria-antecipacao.

END.
