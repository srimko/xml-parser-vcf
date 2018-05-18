<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:import href="../../../../xsl/GEN_global.xsl" />
  <xsl:import href="../../../../xsl/GEN_edit.xsl" />
  <xsl:import href="../../../../xsl/GEN_glossaire.xsl" />
  <xsl:import href="listeGLO.xsl" />
  <xsl:import href="detailGLO.xsl" />
  <xsl:output method="html" version="4.0" indent="no" doctype-public="-//W3C//DTD HTML 4.01 Strict//EN" />
  <xsl:template match="/">
    <html>
      <head>
        <xsl:call-template name="JSCRIPT_CSS_GLO" />
      </head>
      <body onload="entrerDonnees()" style="margin:0px;height:100%">
        <div id="STY_fondListeGLO" class="STY_fondListeGLO" style="display:none; position:absolute; left:0;width:100%; height:100%">
          <xsl:call-template name="listeGLO" />
        </div>
        <div id="STY_fondDetailGLO" class="STY_fondDetailGLO" style="display:none; position:absolute; left:0;width:101%; height:101%;overflow:hidden">
          <xsl:call-template name="detailGLO" />
        </div>
        <xsl:call-template name="STOCK_DEFS" />
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>