DEF TEMP-TABLE ttErro
    FIELD codigo    AS CHAR
    FIELD mensagem  AS CHAR.
    
DEF TEMP-TABLE ttParam
    FIELD solicitacao  AS CHAR.

DEFINE TEMP-TABLE ttStatus
    FIELD solicitacao   AS CHAR
    FIELD descricao     AS CHAR /* descrição do status. Ex.: Enviado ao Banco */
    FIELD data          AS date
    field ultimo        as char. /* informar se é o status final da solicitação, ou seja, */
                                 /* quando não há mais nenhuma ação a ser feita no ERP. */
                                 /* Após receber esse campo como S, o fluxo não irá mais consultar */
                                 /* o ERP para atualizar o status e encerrará o fluxo. Informar S/N */

DEFINE DATASET dsInput  FOR ttParam.
DEFINE DATASET dsOutput FOR ttStatus, ttErro.

PROCEDURE piBusca:

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

        RUN pi-busca-status.
    END.
    ELSE DO:
        CREATE ttErro.
        ASSIGN ttErro.codigo = "0"
               ttErro.mensagem = "Par�metros n�o informados".
    END.
    
    DATASET dsOutput:WRITE-JSON("LONGCHAR", wsOutput, FALSE).

END PROCEDURE.

PROCEDURE pi-busca-status.

END.

