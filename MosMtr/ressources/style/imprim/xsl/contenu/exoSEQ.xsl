<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"> <xsl:import href="../../../../../../../../MosGnr/xsl/export/GEN_vImprim.xsl" /> <xsl:template name="exoSEQ"> <div class="STY_question"> <xsl:apply-templates select="exo/question" /> </div>  <div class="STY_texteSEQ"><xsl:apply-templates select="exo/texteSeq" /></div> <xsl:if test="exo/interactions/*"> <div class="STY_zoneCommentaire"> <xsl:call-template name="COMMENTAIRES_EXO" /> </div> </xsl:if> </xsl:template> <xsl:template match="/"> <xsl:call-template name="ENTETE_PAGE" /> <xsl:call-template name="STYLE_contenu" /> <xsl:call-template name="exoSEQ" /> <xsl:call-template name="BAS_PAGE" /> </xsl:template> <xsl:template match="texteSeq"> <xsl:choose> <xsl:when test="/exo/@afficheCorrection='oui'"> <xsl:apply-templates select="table[position()=1]/tr/td" /> <div class="STY_horsSequenceJuste"><xsl:apply-templates select="table[position()=2]/tr/td" /></div> </xsl:when> <xsl:otherwise> <xsl:apply-templates select="table/tr/td"> <xsl:sort select="text()" order="descending" /> <xsl:sort select=".//img/@src" order="descending" /> </xsl:apply-templates> </xsl:otherwise> </xsl:choose> </xsl:template> <xsl:template match="texteSeq/table/tr/td" priority="2"> <xsl:if test=".//node()"> <xsl:if test="//@retourLigne='oui'"><br/></xsl:if> <xsl:choose><xsl:when test="//@disposition='V'"> <div class="STY_objetSeq"><xsl:apply-templates /><xsl:if test="//@retourLigne='oui'"><br/></xsl:if></div> </xsl:when><xsl:otherwise><span class="STY_objetSeq"><xsl:apply-templates /><xsl:if test="//@retourLigne='oui'"><br/></xsl:if></span></xsl:otherwise></xsl:choose> </xsl:if> </xsl:template> <xsl:template match="consigne"><td class="STY_commentaire" valign="top"> <div class="STY_comtTitre"> <xsl:if test=".//img or .//clipAV"><xsl:attribute name="style">display:block;margin-bottom:3px</xsl:attribute></xsl:if> <xsl:choose><xsl:when test="@titre"> <xsl:value-of select="@titre"/> </xsl:when><xsl:otherwise><lex id="12"/></xsl:otherwise></xsl:choose><xsl:if test="not(@titre='') and not(p or div or img or clipAV or table)">.</xsl:if></div> <div class="STY_comtContenu"><xsl:apply-templates /></div></td></xsl:template><xsl:template match="exo//commentaire"><td class="STY_commentaire" valign="top"><xsl:if test="not(/*/@afficheCorrection='non')"> <div class="STY_comtTitre"> <xsl:if test=".//img or .//clipAV"><xsl:attribute name="style">display:block;margin-bottom:3px</xsl:attribute></xsl:if> <xsl:choose><xsl:when test="@num and @num!=''"><xsl:value-of select="@num" />. <xsl:value-of select="@titre" /></xsl:when><xsl:otherwise> <xsl:choose><xsl:when test="@titre"> <xsl:value-of select="@titre"/> </xsl:when><xsl:otherwise><lex id="131"/></xsl:otherwise></xsl:choose></xsl:otherwise></xsl:choose><xsl:if test="not(@titre='') and not(p or div or img or clipAV or table)">.</xsl:if></div> <div class="STY_comtContenu"><xsl:apply-templates /></div> </xsl:if></td></xsl:template><xsl:template match="suggestion"><td class="STY_commentaire" valign="top"><xsl:if test="not(@ref='[solution]') or not(/*/@afficheCorrection='non')"> <div class="STY_comtTitre"> <xsl:if test=".//img or .//clipAV"><xsl:attribute name="style">display:block;margin-bottom:3px</xsl:attribute></xsl:if> <xsl:choose><xsl:when test="@titre"> <xsl:value-of select="@titre"/> </xsl:when><xsl:otherwise> <xsl:choose><xsl:when test="@ref='[solution]'"><lex id="311"/></xsl:when> <xsl:otherwise><lex id="196"/></xsl:otherwise></xsl:choose> </xsl:otherwise></xsl:choose><xsl:if test="not(@titre='') and not(p or div or img or clipAV or table)">.</xsl:if></div> <div class="STY_comtContenu"><xsl:apply-templates /></div> </xsl:if></td></xsl:template></xsl:stylesheet>