﻿<?xml version="1.0"?><xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"><xsl:import href="../../../../MosMtr/xsl/GEN_cadresGlossaire.xsl"/><xsl:template name="FEN_X">20</xsl:template><xsl:template name="FEN_Y">20</xsl:template><xsl:template name="FEN_L">812</xsl:template><xsl:template name="FEN_H">660</xsl:template><xsl:template name="MENU_H">61</xsl:template><xsl:template name="LISTE_L">200</xsl:template><xsl:template match="/"><html><head><xsl:call-template name="INSERT_JS_CADRES"/></head><frameset onload="lancerGlo()" cols="*" frameborder="no" border="0" framespacing="0"><xsl:call-template name="JEUX_CADRES"/></frameset></html></xsl:template></xsl:stylesheet>