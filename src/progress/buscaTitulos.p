DEF TEMP-TABLE ttErro
    FIELD codigo    AS CHAR
    FIELD mensagem  AS CHAR.
    
DEF TEMP-TABLE ttParam
    FIELD codCliente  AS CHAR.

DEFINE TEMP-TABLE ttTitulos
    FIELD codCliente    AS CHAR
    FIELD codEstab      AS CHAR
    FIELD codEspec      AS CHAR
    FIELD codSerie      AS CHAR
    FIELD numTitulo     AS CHAR
    FIELD dataEmissao   AS DATE
    FIELD dataVencto    AS DATE
    FIELD parcela       AS CHAR
    FIELD matriz        AS CHAR
    FIELD valorOriginal AS DECIMAL FORMAT "->>>,>>>,>>9.99"
    FIELD valorSaldo    AS DECIMAL FORMAT "->>>,>>>,>>9.99".

DEFINE BUFFER bf-emitente FOR emitente. 

DEFINE DATASET dsInput  FOR ttParam.
DEFINE DATASET dsOutput FOR ttTitulos, ttErro.

PROCEDURE piBusca:

    DEF INPUT  PARAM wsInput    AS LONGCHAR NO-UNDO.
    DEF OUTPUT PARAM wsOutput   AS LONGCHAR NO-UNDO.

    DATASET dsInput:READ-JSON("LONGCHAR", wsInput).

    FIND FIRST ttParam NO-ERROR.
    IF AVAIL ttParam THEN DO:

        find first emitente where emitente.cod-emitente = int(ttParam.codCliente) NO-LOCK.
        if not avail emitente then do:
            create ttErro.
            assign ttErro.codigo = "1"
                   ttErro.mensagem = "Cliente nÆo encontrado! Verifique se o c¢digo do emitente existe!".

        end.
        else do:

            FOR EACH bf-emitente WHERE bf-emitente.nome-matriz = emitente.nome-matriz NO-LOCK. 

               FOR EACH estabelecimento NO-LOCK.

                  FOR EACH tit_Acr WHERE tit_acr.cod_estab = estabelecimento.cod_estab AND 
                                         tit_acr.cdn_cliente = bf-emitente.cod-emitente AND 
                                         tit_Acr.dat_emis_docto >= TODAY - 3650 AND 
                                         tit_acr.LOG_sdo_tit_acr = YES NO-LOCK.
                      CREATE ttTitulos.
                      ASSIGN ttTitulos.codCliente      = STRING(bf-emitente.cod-emitente)
                             ttTitulos.codEstab        = tit_acr.cod_estab
                             ttTitulos.codEspec        = tit_acr.cod_espec 
                             ttTitulos.codSerie        = tit_acr.cod_ser
                             ttTitulos.numTitulo       = tit_acr.cod_tit_acr
                             ttTitulos.dataEmissao     = tit_acr.dat_emis_docto
                             ttTitulos.dataVencto      = tit_acr.dat_vencto_tit_acr
                             ttTitulos.parcela         = tit_acr.cod_parcela
                             ttTitulos.valorOriginal   = tit_acr.val_origin_tit_acr
                             ttTitulos.valorSaldo      = tit_acr.val_sdo_tit_acr
                             ttTitulos.matriz          = IF bf-emitente.nome-matriz = bf-emitente.nome-abrev THEN "SIM" ELSE "NAO". 
                  END.
               END.
            END.
        end.
    END.
    ELSE DO:
        CREATE ttErro.
        ASSIGN ttErro.codigo = "0"
               ttErro.mensagem = "Parƒmetros nÆo informados".
    END.
    
    DATASET dsOutput:WRITE-JSON("LONGCHAR", wsOutput, FALSE).

END PROCEDURE.


