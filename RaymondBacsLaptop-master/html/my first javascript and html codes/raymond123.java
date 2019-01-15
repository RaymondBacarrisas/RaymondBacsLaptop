import java.awt.*; 
import java.awt.Color;
import java.awt.event.*;
import java.awt.Dimension;
import javax.swing.*;
import javax.swing.JFrame;
import javax.swing.SwingUtilities;

public class raymond123 
{
	public static void main (String[] args)
	{
		SwingUtilities.invokeLater(new Runnable() { @Override public void run() { new myformholder(); }});
	}
}

class myformholder extends JFrame
{
	private JPanel firstPanel;
	public myformholder()
	{
		JFrame jfrm1 = new JFrame("Raymond Application");
		jfrm1.getContentPane().setBackground(new Color(100, 100, 100));
		jfrm1.setSize(800, 800);
		//-------------------------- Added Controls ----------------------------
		jfrm1.add(loginPanel(), "North");
		//----------------------------------------------------------------------
		jfrm1.setExtendedState(JFrame.MAXIMIZED_BOTH);
		jfrm1.setVisible(true);
	}

	public JPanel loginPanel()
	{
		firstPanel = new JPanel();
		firstPanel.setSize(300, 300);
		return firstPanel;
	}
}