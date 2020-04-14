<meta name="viewport" content="width=device-width, initial-scale=1">

<#import "/wcm.ftl" as wcm/>
<#if pageRender.isEditMode()=true>
    <@wcm.header />
<#else>
    
</#if>

<!-- WCM Wrapper content -->
<div class="wcm-wrapper-content">

    <!-- Wrapper -->
    
    <div class="clearfix wcm-background">

        <!-- Onde deverá estar a barra de formatação -->
        <#if pageRender.isEditMode()=true>
        
            <div name="formatBar" id="formatBar"></div>
            <!-- Div geral -->
            <!-- Há CSS distinto para Edição/Visualização -->
        <div id="edicaoPagina" class="clearfix">
        <#else>
        <div class="clearfix">
        </#if>

            <!-- Slot 1 -->
            <div class="editable-slot slotfull layout-1-1" id="slotFull1">
                <@wcm.renderSlot id="SlotA" editableSlot="true"/>
            </div>


        </div>
    </div>

</div>
