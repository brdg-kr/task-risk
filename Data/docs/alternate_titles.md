# Alternate Titles

* [Excel](/dictionary/30.1/excel/alternate_titles.html)
* [Text](/dictionary/30.1/text/alternate_titles.html)
* [MySQL](#)
* [SQL Server](/dictionary/30.1/mssql/alternate_titles.html)
* [Oracle](/dictionary/30.1/oracle/alternate_titles.html)

| **Purpose:** | Provide alternate occupational titles for O*NET-SOC occupations. |
| **Table Name:** | alternate_titles |
| **Download:** | [29_alternate_titles.sql](/dl_files/database/db_30_1_mysql/29_alternate_titles.sql) |

### Structure and Description:

| Column | Type | Column Content |
| --- | --- | --- |
| onetsoc_code | Character(10) | O*NET-SOC Code *(see [*Occupation Data*](occupation_data.html "Occupation Data"))* |
| alternate_title | Character Varying(250) | Alternate occupational title |
| short_title | Character Varying(150) | Short version of alternate title (if applicable) |
| sources | Character Varying(50) | List of source codes — see below |

This file contains job or alternate "lay" titles linked to occupations in the O*NET-SOC classification system. The file was developed to improve keyword searches in several Department of Labor internet applications (i.e., Career InfoNet, O*NET OnLine, and O*NET Code Connector). The file contains occupational titles from existing occupational classification systems, as well as from other diverse sources. When a title contains acronyms, abbreviations, or jargon, the “Short Title” column contains the brief version of the full title. The “Source(s)” column contains a comma delimited list of codes which indicate the source of the title information; the codes are identified below:

| 01 | Associations [i.e., National Retail Federation, Environmental Career Centers (ECC), etc.] |
|---|---|
| 02 | Incumbent Data – O*NET Data Collection |
| 03 | Occupational Code Assignment (OCA) |
| 04 | SOC (i.e., SOC Index, SOC Volume 2, etc.) |
| 05 | State Agencies |
| 06 | US Bureau of Census (e.g., Census Index) |
| 07 | USDOL – BLS (e.g., IT to SOC) |
| 08 | USDOL – ETA (i.e., OPDER, OATELS, ACINET/Fu Associates, DOT, O*NET Center, etc.) |
| 09 | USDOL – User input, web applications (Code Connector, OnLine, and ACINET) |
| 10 | Employer Job Postings |

The file is displayed in four tab delimited fields with the columns named O*NET-SOC Code, Alternate Title, Short Title, and Source(s). The four fields are represented by one row. There are a total of 56,505 rows of data in this file.

For more information, see:
* [O*NET Alternate Titles Procedures](https://www.onetcenter.org/reports/AltTitles.html)
* [A Weighted O*NET Keyword Search (WWS)](https://www.onetcenter.org/reports/WWS.html)
* [Military Transition Search (as used in My Next Move for Veterans)](https://www.onetcenter.org/reports/MilitarySearch.html)

### File Structure Changes:

| Release Number | Description of Change |
| --- | --- |
| 20.1 | Added as a new file |
| 20.2 - 21.3 | No structure changes |
| 22.0 | increased "Alternate Title" column from 150 to 250 characters |
| 22.1 - 30.1 | No structure changes |

### Data Example - alternate_titles:

| onetsoc_code | alternate_title | short_title | sources |
| --- | --- | --- | --- |
| 29-2099.00 | Sleep Technician | NULL | 09 |