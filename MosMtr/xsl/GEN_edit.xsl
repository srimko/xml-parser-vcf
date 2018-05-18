<?xml version="1.0" ?><xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"><xsl:template match="lienHypertexte"><xsl:variable name="objZone" select="(ancestor::commentaire) | (ancestor::suggestion) | (ancestor::consigne)"/><a class="STY_lienComt"><xsl:if test="$objZone"><xsl:attribute name="class"><xsl:choose><xsl:when test="($objZone/@pX!='') or ($objZone/@pY!='')">STY_lienBulle<xsl:value-of select="$objZone/@styBulle"/></xsl:when><xsl:otherwise>STY_lienDansZoneComt</xsl:otherwise></xsl:choose></xsl:attribute></xsl:if> <xsl:if test="not (starts-with(@href,'javascript:'))"> <xsl:attribute name="target">_blank</xsl:attribute></xsl:if> <xsl:copy-of select="@href"/><xsl:apply-templates/></a></xsl:template><xsl:template match="p|b|i|li|ul|ol|u|tr|td|div|span|font|table|sup|sub|code|h2|h3|h4|blockquote"><xsl:copy><xsl:copy-of select="@*"/> <xsl:apply-templates/></xsl:copy></xsl:template><xsl:template match="p[.//table]" priority="2"><xsl:element name="div"><xsl:copy-of select="@*"/><xsl:apply-templates/></xsl:element></xsl:template><xsl:template match="br|hr"><xsl:copy/></xsl:template><xsl:template match="clipAV"><script type="text/javascript">ajDocW(PF_clipAV('<xsl:value-of select="@id"/>','<xsl:value-of select="@src"/>','<xsl:value-of select="@width"/>','<xsl:value-of select="@height"/>','<xsl:value-of select="@demarreAuto"/>','<xsl:value-of select="@lecteur"/>','<xsl:value-of select="@boucle"/>','<xsl:value-of select="@align"/>','<xsl:apply-templates select="paramAV"/><xsl:value-of select="@params"/>','<xsl:value-of select="@style"/>','<xsl:if test="(ancestor::commentaire) or (ancestor::suggestion) or (ancestor::consigne)">cmt</xsl:if>'));</script></xsl:template> <xsl:template match="paramAV"><xsl:value-of select="@nom"/>:<xsl:value-of select="@valeur"/>;</xsl:template></xsl:stylesheet>