  
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
        <meta name="layout" content="main" />
        <title>Create ClusterPlanDetails</title>         
    </head>
    <body>
        <div class="nav">
            <span class="menuButton"><a class="home" href="${createLinkTo(dir:'')}">Home</a></span>
            <span class="menuButton"><g:link class="list" action="list">ClusterPlanDetails List</g:link></span>
        </div>
        <div class="body">
            <h1>Create ClusterPlanDetails</h1>
            <g:if test="${flash.message}">
            <div class="message">${flash.message}</div>
            </g:if>
            <g:hasErrors bean="${clusterPlanDetails}">
            <div class="errors">
                <g:renderErrors bean="${clusterPlanDetails}" as="list" />
            </div>
            </g:hasErrors>
            <g:form action="save" method="post" >
                <div class="dialog">
                    <table>
                        <tbody>
                        
                            <tr class='prop'>
                                <td valign='top' class='name'>
                                    <label for='cluster'>Cluster:</label>
                                </td>
                                <td valign='top' class='value ${hasErrors(bean:clusterPlanDetails,field:'cluster','errors')}'>
                                    <g:select optionKey="id" from="${Cluster.list()}" name='cluster.id' value="${clusterPlanDetails?.cluster?.id}" ></g:select>
                                </td>
                            </tr> 
                        
                            <tr class='prop'>
                                <td valign='top' class='name'>
                                    <label for='numberOfJobs'>Number Of Jobs:</label>
                                </td>
                                <td valign='top' class='value ${hasErrors(bean:clusterPlanDetails,field:'numberOfJobs','errors')}'>
                                    <input type='text' id='numberOfJobs' name='numberOfJobs' value="${fieldValue(bean:clusterPlanDetails,field:'numberOfJobs')}" />
                                </td>
                            </tr> 
                        
                            <tr class='prop'>
                                <td valign='top' class='name'>
                                    <label for='plan'>Plan:</label>
                                </td>
                                <td valign='top' class='value ${hasErrors(bean:clusterPlanDetails,field:'plan','errors')}'>
                                    <g:select optionKey="id" from="${Plan.list()}" name='plan.id' value="${clusterPlanDetails?.plan?.id}" ></g:select>
                                </td>
                            </tr> 
                        
                        </tbody>
                    </table>
                </div>
                <div class="buttons">
                    <span class="button"><input class="save" type="submit" value="Create"></input></span>
                </div>
            </g:form>
        </div>
    </body>
</html>
