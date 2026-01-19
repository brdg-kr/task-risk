# Technology Skills

* [Excel](/dictionary/30.1/excel/technology_skills.html)
* [Text](/dictionary/30.1/text/technology_skills.html)
* [MySQL](#)
* [SQL Server](/dictionary/30.1/mssql/technology_skills.html)
* [Oracle](/dictionary/30.1/oracle/technology_skills.html)

| **Purpose:** | Provide Technology Skills examples. |
| **Table Name:** | technology_skills |
| **Download:** | [31_technology_skills.sql](/dl_files/database/db_30_1_mysql/31_technology_skills.sql) |

### Structure and Description:

| Column | Type | Column Content |
| --- | --- | --- |
| onetsoc_code | Character(10) | O*NET-SOC Code *(see [*Occupation Data*](occupation_data.html "Occupation Data"))* |
| example | Character Varying(150) | Technology skill example |
| commodity_code | Decimal(8,0) | UNSPSC commodity code *(see [*UNSPSC Reference*](unspsc_reference.html "UNSPSC Reference"))* |
| hot_technology | Character(1) | Whether example is classified as a hot technology (Y=yes, N=no) |
| in_demand | Character(1) | Whether example is classified as in demand for the occupation (Y=yes, N=no) |

This file contains the Technology Skills examples, including hot and in-demand technologies, associated with O*NET-SOC occupations. The columns “Commodity Code” and “Commodity Title” classify the example under the United Nations Standard Products and Services Code (UNSPSC). See the [*UNSPSC Reference*](unspsc_reference.html "UNSPSC Reference") section for more information. The “Hot Technology” column indicates requirements frequently included across all employer job postings. A concise list of all hot technologies may be downloaded from [O*NET OnLine](https://www.onetonline.org/search/hot_tech/). The “In Demand” column indicates requirements frequently included in employer job postings for the particular occupation.

We welcome feedback on the Technology Skills database. We accept suggestions for new technology skills via our [feedback process](https://www.onetcenter.org/t2_feedback.html). Suggestions will be considered for a future update of the Technology Skills database.

The file is displayed in five tab delimited fields with the columns named O*NET-SOC Code, Example, Commodity Code, Hot Technology, and In Demand. The five fields are represented by one row. There are a total of 32,773 rows of data in this file.

For more information, see:
* [Hot Technologies and In Demand Technology Skills within the O*NET System](https://www.onetcenter.org/reports/Hot_Technologies_Demand.html)
* [O*NET Center Tools and Technology Quality Control Processes](https://www.onetcenter.org/reports/T2_QC.html)
* [O*NET Tools and Technology: A Synopsis of Data Development Procedures](https://www.onetcenter.org/reports/T2Development.html)
* [Identification of “Hot Technologies” within the O*NET® System](https://www.onetcenter.org/reports/Hot_Technologies.html)
* [Tools and Technology Search](https://www.onetcenter.org/reports/T2_Search.html)

### File Structure Changes:

| Release Number | Description of Change |
| --- | --- |
| 23.2 | Added as a new file |
| 23.3 - 27.0 | No structure changes |
| 27.1 | “In Demand” column added |
| 27.2 - 30.1 | No structure changes |

### Data Example - technology_skills:

| onetsoc_code | example | commodity_code | hot_technology | in_demand |
| --- | --- | --- | --- | --- |
| 11-2011.00 | Actuate BIRT | 43232314 | N | N |
| 11-2011.00 | Adobe Acrobat | 43232202 | Y | N |
| 11-2011.00 | Adobe Acrobat Reader | 43232202 | N | N |
| 11-2011.00 | Adobe After Effects | 43232103 | Y | N |
| 11-2011.00 | Adobe Creative Cloud software | 43232102 | Y | N |