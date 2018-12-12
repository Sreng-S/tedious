CREATE SCHEMA [DW.YTS.NORM];
GO

CREATE TABLE [DW.YTS.NORM].[FIPS10years](
[ABI] [varchar](10) NULL,
[UpdateDate] [varchar](11) NULL,
[FIPS] [varchar](5) NULL,
[Year] [int] NOT NULL
) ON [PRIMARY];
GO

CREATE TABLE [DW.YTS.NORM].[CompanyBasics](
[ABI] [varchar](10) NULL,
[Company] [varchar](500) NULL,
[CITY] [varchar](500) NULL,
[State] [varchar](10) NULL,
[ZipCode] [varchar](10) NULL,
[StockTicker] [varchar](10) NULL,
[InactiveBinary] [int] NOT NULL
) ON [PRIMARY];
GO

CREATE TABLE [DW.YTS.NORM].[NAICS10years](
[ABI] [varchar](10) NULL,
[UpdateDate] [varchar](11) NULL,
[NAICS] [int] NULL,
[Year] [int] NOT NULL
) ON [PRIMARY];
GO

CREATE TABLE [DW.YTS.NORM].[ZIP10years](
[ABI] [varchar](10) NULL,
[UpdateDate] [varchar](11) NULL,
[ZIP] [int] NULL,
[Year] [int] NOT NULL
) ON [PRIMARY];
GO

CREATE SCHEMA [DW.Crosswalk];
GO

CREATE TABLE [DW.Crosswalk].[NAICS_Names](
[2012 NAICS US Code] [varchar](50) NULL,
[2012 NAICS US Title] [varchar](1000) NULL
) ON [PRIMARY];
GO
